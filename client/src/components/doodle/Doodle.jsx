
import "css-doodle"
export const Doodle = () => {
  return (
    <css-doodle>
      {`@grid: 16 / 100%;

@random {
  border-left: 1px solid #5d81bc;
}
@random {
  border-top: 1px solid #5d81bc;
}
@random(.25) {
  background: linear-gradient(
    @p(#fff, tan, #5d81bc), @lp
  )
  50% / @r(60%) @lr
  no-repeat;
}
@random {
  filter: drop-shadow(0 0 10px #fff);
}`}
    </css-doodle>
  );
};