export declare type CallDirection = "send" | "recieve";
/** callback event group, connect SDK to UI */
export interface CallBackEvent {
    /** user agent register success */
    onRegisterSuccess: () => void;
    /** user agent register fail */
    onRegisterFailure: (reason: string) => void;
    /** user agent is connected */
    onConnect: () => void;
    /** user agent is disconnected */
    onDisconnect: (reason: string) => void;
    /**
     * invoke while recive incoming call
     * @param ext caller extension
     * @param displayname caller's
     * @param isMeeting recieve meeting call
     * @param existsAudio audio call
     * @param existsVideo video call
     */
    onInviteIncoming: (ext: string, displayname: string, isMeeting: boolean, existsAudio: boolean, existsVideo: boolean, autoAnswer: boolean) => void;
    /** outgoing call has sent INVITE, invoke when recice 100 Trying */
    onInviteTrying: (ext: string, existsVideo: boolean, isMeeting: boolean) => void;
    /** outgoing call has sent INVITE, invoke when recice 183 Progress */
    onInviteSessionProgress: (ext: string, existsVideo: boolean, isMeeting: boolean) => void;
    /** outgoing call has sent INVITE, invoke when recice 180 Ringing */
    onInviteRinging: (ext: string, existsVideo: boolean, isMeeting: boolean) => void;
    /** outgoing call has sent INVITE, invoke when recice 200 OK */
    onInviteAnswered: (ext: string) => void;
    /** outgoing call has sent INVITE, invoke when recice 4xx, 5xx, or 6xx */
    onInviteFailure: (ext: string, reason: string) => void;
    /**
     * recieve out dialog message
     * @param from extension number
     * @param message message content
     * @param contentType message content type
     */
    onRecvOutOfDialogMessage: (from: string, message: string, contentType: string) => void;
    /** recieve subcription message, NOTIFY Message */
    onRecvNotifyOfSubscription: (ext: string, message: string) => void;
    /** invoke when call is established */
    onInviteConnected: (ext: string, answerWithVideo: boolean, isMeeting: boolean, type: CallDirection) => void;
    /** recieve INFO Message */
    onRecvInfo: (ext: string, message: string) => void;
    /** recieve in dialog BYE or CANCEL */
    onInviteClosed: (etx: string) => void;
    /**
     * recieve remote peer user re-invite.
     */
    onInviteUpdated: (ext: string, existsAudio: boolean, existxVideo: boolean, existsScreen: boolean) => void;
    /** remote enable hold */
    onRemoteHold: (ext: string) => void;
    /** remote enable unhold */
    onRemoteUnHold: (ext: string) => void;
    /** transfer trying, recieve 100 Trying */
    onTransferTrying: (ext: string) => void;
    /** transfer ringing, recieve 180 Ringing | 183 Process (color ring back tone) */
    onTransferRinging: (ext: string) => void;
    /** transfer success */
    onACTVTransferSuccess: (ext: string) => void;
    /** transfer fail */
    onACTVTransferFailure: (ext: string) => void;
    /**
     * recive in dialog DTMF
     * @param tone enum {"0","1","2","3","4","5","6","7","8","9","#","*",}
     */
    onRecvDtmfTone: (ext: string, tone: string) => void;
    /**
     * recieve in dialog message
     * @param from from extension number
     * @param message message content
     * @param contentType message content type
     */
    onRecvMessage: (from: string, message: string, contentType: string) => void;
    /** send screen share be accepted */
    onShareAccept: (from: string | undefined, to: string | undefined) => void;
    /** stop screen share accept by remote */
    onShareStop: (from: string | undefined, to: string | undefined) => void;
    /** recieve remote screen share */
    onRecieveShare: (ext: string | undefined, to: string | undefined) => void;
    /** recieve remote stop screen share */
    onRecieveStopShare: (ext: string | undefined, to: string | undefined) => void;
}
