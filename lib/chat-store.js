import { create } from "zustand";

const useChatStore = create((set, get) => ({
  status: "EMPTY",
  activeChat: null,
  chatHistory: [],
  showProfile: false,

  setStatus: (status) => set({ status }),

  startChat: (user) => {
    const { chatHistory } = get();
    const existingChat = chatHistory.find((chat) => chat.id === user.id);

    if (!existingChat) {
      set((state) => ({
        chatHistory: [...state.chatHistory, { ...user, messages: [] }],
      }));
    }

    set({
      activeChat: user,
      status: "ACTIVE",
      showProfile: false,
    });
  },

  viewProfile: (user) => {
    const { startChat } = get();
    startChat(user);
    set({ showProfile: true });
  },

  sendMessage: async (message) => {
    const { activeChat } = get();
    if (!activeChat) return;

    // Send user's message
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      chatHistory: state.chatHistory.map((chat) =>
        chat.id === activeChat.id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      ),
    }));

    // const aiMessageText = await generateAIConversation(
    //   currentUserTags,
    //   otherUserTags
    // );

    // AI response after generating conversation
    // const aiMessage = {
    //   id: Date.now(),
    //   text: aiMessageText,
    //   sender: "ai",
    //   timestamp: new Date().toISOString(),
    // };

    // set((state) => ({
    //   chatHistory: state.chatHistory.map((chat) =>
    //     chat.id === activeChat.id
    //       ? { ...chat, messages: [...chat.messages, aiMessage] }
    //       : chat
    //   ),
    // }));
  },

  clearChat: () => {
    const { activeChat } = get();
    if (!activeChat) return;

    set((state) => ({
      chatHistory: state.chatHistory.map((chat) =>
        chat.id === activeChat.id ? { ...chat, messages: [] } : chat
      ),
    }));
  },

  backToList: () =>
    set({
      status: "LIST",
      activeChat: null,
      showProfile: false,
    }),

  getCurrentChat: () => {
    const { activeChat, chatHistory } = get();
    return activeChat
      ? chatHistory.find((chat) => chat.id === activeChat.id)
      : null;
  },
}));

export default useChatStore;
