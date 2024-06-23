function InitInstance()
    createKeySetupWindow()
    createMythicProgress()
    PushForgeMessage(ForgeTopic.MYTHIC_SET_AFFIXES_AND_START, "ping");
end