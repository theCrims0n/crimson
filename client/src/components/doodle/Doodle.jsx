
import "css-doodle"
export const Doodle = () => {
  return (
    <css-doodle>
      {`:doodle {
        @grid: 8 / 100%;
      }

      transition: .2s @r(.6s);
      border-radius: @pick(100% 0, 0 100%);
      transform: scale(@r(.25, 1.25));

      background: hsla(
        calc(200 - 6 * @x * @y),
        70%, 68%, @r.8
      );`}
    </css-doodle>
  );
};