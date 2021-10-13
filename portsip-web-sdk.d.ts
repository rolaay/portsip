import { Session, UserAgent } from "../sdk/sipjs";
import { CallBackEvent } from "./event-bus";
/** video call or voice only */
export interface MediaConstrains {
    audio: boolean | MediaTrackConstraints;
    video: boolean | MediaTrackConstraints;
}
declare type SessionTransceiverDirection = RTCRtpTransceiverDirection | "";
/** Media direction, initial value is "", means no have media */
export interface MediaProperty {
    audio: SessionTransceiverDirection;
    video: SessionTransceiverDirection;
    screen: SessionTransceiverDirection;
}
/** only one active session */
interface SingleMediaID {
    remoteAudioID: string;
    remoteVideoID?: string;
}
/** allow multiple active sessions */
interface MultipleMediaID {
    remoteAudioID: string[];
    remoteVideoID?: string[];
}
/** screen share player element and local video element */
interface ScreenAndLocalMediaID {
    remoteScreenID?: string;
    localVideoID?: string;
}
/**
 * single mode,
 *
 * only one active session.
 * media element ID, which video and audio playing
 */
interface SingleMediaElement extends SingleMediaID, ScreenAndLocalMediaID {
}
/**
 * multiple mode,
 *
 * allow connect multiple calls at the same time
 * only support max 16 element concurrent play media
 */
interface MultipleMediaElement extends MultipleMediaID, ScreenAndLocalMediaID {
}
/** 【1-16】 concurrent session, key is element ID, value is indicate playing or not */
interface ConcurrentMediaElement {
    id: string;
    isPlaying: boolean;
    ext: string;
}
/**
 * A class representing a point
 * @class  Point
 */
export default class PortSipSdk {
    #private;
    sessions: Map<string, {
        session: Session | null;
        constraints: MediaConstrains;
        mediaProperty: MediaProperty;
    }>;
    private subscribers;
    userAgent: UserAgent | null;
    private registerer;
    private UADelegate;
    private sessionDelegate;
    protected event: CallBackEvent;
    protected videoMaxBitrate: number;
    protected videoResolusion: {
        width: {
            max: number;
        };
        height: {
            max: number;
        };
    };
    protected remoteAudioID: string | Array<ConcurrentMediaElement>;
    protected remoteVideoID: string | Array<ConcurrentMediaElement> | undefined;
    protected remoteScreenID: string | undefined;
    protected localVideoID: string | undefined;
    /**
     * @author PortSIP Solutions, Inc. All rights reserved.
     * @version 18.1.0
     * @param event callback function group
     * @param elementID If you pass in an array,
     *
     *                  the number of the remoteAudioID and remoteVideoID must be equal and no greater than 16,
     *
     *                  in this mode, attempts to reach more than a limited number of sessions will lead to unexpected results.
     */
    constructor(event: CallBackEvent, elementID: SingleMediaElement | MultipleMediaElement);
    /**
     * create and start user agent, then register server
     * @param username
     * @param password
     * @param domain
     * @param server
     * @param displayName optional
     * @param userAgentDescribe optional
     */
    createUserAgent(username: string, password: string, domain: string, server: string, displayName?: string, userAgentDescribe?: string): Promise<void>;
    /**
     * register user agent
     * @internal
     */
    private registerServer;
    refreshRegistration(): Promise<unknown>;
    /**
     * destroy user agent
     * @returns always success if user agent exist
     */
    unRegisterServer(): boolean;
    /**
     * store session call media property
     * @param key session key
     * @param SDP recieved SDP
     * @returns media property has changed or not
     * @internal
     *  */
    private setSessionMediaProperty;
    /**
     * initialize session, and set media constrait video to false
     * @internal
     */
    protected initAudioCall(ext: string): void;
    /**
     * initialize session, and set media constrait video to true
     * @internal
     */
    protected initVideoCall(ext: string): void;
    /**
     * set senders video max bitrate, next call will take effect
     * @default 1024 Kbps
     */
    setVideoBitrate(videoMaxBitrate: number): void;
    /**
     * set video max resulution, default is 1280*720
     * @param width
     * @param height
     */
    setVideoResolution(width: number, height: number): void;
    /**
     * set senders video max bitrate, next call will take effect
     * @ignore not implement
     * @default ? Kbps
     */
    setAudioBitrate(audioMaxBitrate: number): void;
    /**
     * make invite call
     * @param targetURI callee URI, like '101@test.com'
     * @param sendSDP default true, if true, will send invite without SDP
     * @param videoCall if video call
     */
    call(targetURI: string, sendSDP: boolean | undefined, videoCall: boolean): Promise<import("../sdk/sipjs/core").OutgoingInviteRequest>;
    /**
     * answer incoming call
     * @param ext extension number which will answer
     * @param videoCall if accept video media
     */
    answerCall(ext: string, videoCall: boolean): Promise<void>;
    /**
     * hangup call, whenever the call is incoming or outgoing, even call is established
     * @param ext extension number which session will handle
     */
    hangUp(ext: string): Promise<void> | Promise<import("../sdk/sipjs/core").OutgoingByeRequest>;
    /**
     * mute local micphone, determining remote peer can hear local voice or not
     * @param ext extension number
     * @param enableMute if set senders audio track mute
     */
    mute(ext: string, enableMute: boolean): Promise<void>;
    /**
     * enable send video to remote, use in call established
     * @param ext extension number
     * @param enableVideo if send video to remote peer
     */
    sendVideo(ext: string, enableVideo: boolean): void;
    /**
     * hold call, and stop send media to remote
     * @param ext extsion number
     */
    hold(ext: string): Promise<string>;
    unhold(ext: string): Promise<string>;
    sendDtmf(ext: string, tone: string): Promise<import("../sdk/sipjs/core").OutgoingInfoRequest>;
    /**
     * cold transfer | blind transfer
     * @param ext current call extension number
     * @param referTargetURI refer to target URI, like `sip:101@test.com`
     * @returns Promise.resolve when send success
     */
    refer(ext: string, referTargetURI: string): Promise<import("../sdk/sipjs/core").OutgoingReferRequest>;
    /**
     * warm transfer | attended transfer
     * @param referSourceExt current call extension number
     * @param referTarget refer to Session which be replaced
     * @returns Promise resolve when send success
     */
    attendedRefer(referSourceExt: string, referTargetExt: string): Promise<import("../sdk/sipjs/core").OutgoingReferRequest>;
    /**
     * handle established session, turn on\off sending audio/video
     * @param ext extension number
     * @param enableAudio if send audio or not
     * @param enableVideo if send video or not, if the call only has audio,
     *                    set true will also send local video to remote peer, but you
     *                    cann't see remote video, unless remote send video
     */
    updateCall(ext: string, enableAudio: boolean, enableVideo: boolean): Promise<never> | undefined;
    /**
     * call Broswer API, get the selected screen's MediaStreamTrack
     */
    getShareableArea(ext: string): Promise<void>;
    /**
     * start screen share
     */
    startShareScreen(ext: string): Promise<boolean>;
    /**
     * stop screen share
     */
    endShareScreen(ext: string): boolean;
    /**
     * out dialog message
     * @param msg
     * @param targetURI like `sip:101@test.com`
     * @param isJSON
     * @returns resolve when send success
     */
    sendOutOfDialogMessage(msg: string, targetURI: string, isJSON: boolean): Promise<void>;
    /**
     * in dialog message, often use in meeting
     * @param msg
     * @param targetURI like `sip:101@test.com`
     * @param isControl send meeting control message
     * @returns resolve when send success
     */
    sendMessage(msg: string, targetURI: string, isControl: boolean): Promise<import("../sdk/sipjs/core").OutgoingMessageRequest>;
    /**
     * send subcription to subscribe user status
     * @param uri like `sip:101@test.com`
     * @returns resolve when send success
     */
    sendSubscription(uri: string): Promise<void>;
    /**
     * terminate specific subscriber
     * @param uri example: `sip:101@$test.com`
     */
    terminateSubscription(uri: string): Promise<void>;
    /**
     * stop play local and remote video
     *
     * you don't need to use this by yourself in general
     */
    cleanupMedia(ext: string): Promise<void>;
    /**
     * load and play local video
     *
     * you don't need to use this by yourself in general
     * @param ext extension number
     */
    setupLocalMedia(ext: string): void;
    /**
     * load and play remote media
     *
     * you don't need to use this by yourself in general
     * @param ext extension number
     */
    setupRemoteMedia(ext: string): void;
    /**
     * display local video into remote video element
     *
     * not work when pass in 【elementID.remoteVideoID】 is a array
     * @param ext extension number
     */
    playLocalVideoInRemoteElement(ext: string): void;
    /**
     * play remote screen share in remote camera video element.
     * not work when pass in 【elementID.remoteVideoID】 is a array
     * @param playInRemote if play screen share media stream in remote video element
     * @param ext extension number
     */
    switchScreenShareRenderInRemote(playInRemote: boolean, ext: string): void;
    /**
     * set srcObject value
     * or src value while not support srcObject
     * @param element video | audio element
     * @param src media resouce
     * @internal
     */
    private setElementSrc;
}
export {};
