import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// -------------------- GET ALL THREADS --------------------
// (This route is unchanged and correct)
router.get("/thread", protect, async (req, res) => {
  try {
    const threads = await Thread.find({ user: req.user._id }).sort({
      updatedAt: -1,
    });
    res.json(threads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// -------------------- GET SINGLE THREAD --------------------
// (This route is unchanged and correct)
router.get("/thread/:threadId", protect, async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId, user: req.user._id });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread.messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch thread" });
  }
});

// -------------------- DELETE THREAD --------------------
// (This route is unchanged and correct)
router.delete("/thread/:threadId", protect, async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({
      threadId,
      user: req.user._id,
    });
    if (!deletedThread) {
      return res
        .status(4404)
        .json({ error: "Thread not found or unauthorized" });
    }
    res.json({ success: "Thread deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

// -------------------- MAIN CHAT ROUTE (NEW LOGIC) --------------------
router.post("/chat", protect, async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Get the user and their limits
    const user = await User.findById(req.user._id);
    let thread = await Thread.findOne({ threadId, user: req.user._id });

    let isNewThread = false; // Flag to save the user later

    // Check if this is a NEW thread or an EXISTING thread
    if (!thread) {
      // ----- THIS IS THE NEW LOGIC -----
      // It's a new thread, so check the LIFETIME counter
      if (user.threadsCreatedCount >= user.threadsLimit) {
        return res.status(403).json({
          error: `Lifetime thread limit (${user.threadsLimit}) reached. You cannot create more threads.`,
        });
      }
      // ---------------------------------

      isNewThread = true;
      thread = new Thread({
        user: req.user._id,
        threadId,
        title: message.substring(0, 50) || "New Chat",
        messages: [{ role: "user", content: message }],
      });
    } else {
      // It's an existing thread, just check the message limit
      if (thread.messages.length >= user.messagesLimitPerThread) {
        return res.status(403).json({
          error: `Message limit (${user.messagesLimitPerThread}) reached for this specific thread.`,
        });
      }
      // Add the user's message
      thread.messages.push({ role: "user", content: message });
    }

    // Get AI reply
    const assistantReply = await getOpenAIAPIResponse(message);
    thread.messages.push({ role: "assistant", content: assistantReply });

    // Save based on whether the thread was new
    if (isNewThread) {
      // Increment the lifetime counter
      user.threadsCreatedCount += 1;

      // Save both the new thread and the updated user
      await Promise.all([thread.save(), user.save()]);
    } else {
      // Just save the updated thread
      await thread.save();
    }

    res.json({ reply: assistantReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
