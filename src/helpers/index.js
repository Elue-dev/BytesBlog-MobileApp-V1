export function scrollToTop(ref) {
  ref.current?.scrollToOffset({
    offset: 0,
    animated: true,
  });
}
