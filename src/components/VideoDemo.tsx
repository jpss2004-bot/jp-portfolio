/** Native playback stays under the visitor's control, including reduced motion. */
export function VideoDemo({ src, poster, label, width, height }: { src: string; poster: string; label: string; width: number; height: number }) {
  return <video className="shot-media" src={src} poster={poster} width={width} height={height} controls playsInline preload="none" aria-label={label} />;
}
