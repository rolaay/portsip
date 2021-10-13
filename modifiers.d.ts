/**
 * 增加共享时，标记处理'msid'，以便区分视频和共享
 * @internal
 */
export declare function addScreenMarkModifier(sdp: string): string;
/** 音频接听视频来电，改video属性为'a=inactive' */
export declare function inactiveVideoModifer(sdp: string): string;
/**
 * 再次共享时，发送sendrecv
 * @internal
 */
export declare function sendScreenModifer(sdp: string): string;
/**
 * 停止共享，改共享video属性为'a=inactive'
 * @internal
 */
export declare function inactiveScreenModifer(sdp: string): string;
