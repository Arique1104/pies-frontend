type TipMap = {
    [keyword: string]: string[];
};

export const piesTipMap: Record<string, TipMap> = {
    physical: {
        tired: ["Try a gentle stretch or a power nap if possible."],
        sleep: ["Sleep is fuel. Maybe a consistent wind-down ritual could help."],
        pain: ["Honor your limits today — your body deserves care."]
    },
    intellectual: {
        distracted: ["Try a 10-minute focus session with a clear goal."],
        curious: ["Feed your curiosity — is there something you’d love to learn today?"],
        overwhelmed: ["Break tasks down into small steps. What’s one thing you can do now?"]
    },
    emotional: {
        anxious: ["Take a few deep breaths — you’re doing your best."],
        numb: ["It’s okay not to feel everything at once. Try checking in with a friend or journaling."],
        grateful: ["Hold onto that gratitude — maybe share it with someone you love."]
    },
    spiritual: {
        disconnected: ["Try a moment of silence, stillness, or connection with something meaningful."],
        lost: ["Even in stillness, you are guided. Try revisiting what grounds you."],
        peaceful: ["What helped you feel peace today? That’s powerful insight."]
    }
};