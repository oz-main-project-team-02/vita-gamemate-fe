import TitleIntro from "../components/Common/TitleIntro";
import CommonLayout from "../layouts/CommonLayout";

export default function CategoryPage() {
  return (
    <CommonLayout>
      <TitleIntro
        titleE='LEAGUE OF LEGENDS'
        titleK='리그오브레전드'
        content='다양한 챔피언과 함께 친구들과 즐거운 순간을 만들어보세요!'
      />
    </CommonLayout>
  );
}
