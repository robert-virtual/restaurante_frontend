import BarChart from "@components/Charts/BarChart";
import TimeLineChart from "@components/Charts/TimeLineChart";
import LineChart from "@components/Charts/LineChart";
import PieChart from "@components/Charts/PieChart";
import Page from "@components/Page";
const ChartsExamples = () => {
  return (
    <Page pageTitle="Charts Examples">
      <h2>Bar Chart</h2>
      <BarChart
        width={200}
        height={200}
        showYAxis
        backgroundColor="#eee"
        data={[
          ["Happy", 100],
          ["BirthDay", 90],
          ["To You", 60],
        ]}
        colors={["#3F38F5", "#24A805", "#A8450D"]}
      />
      <h2>Pie Chart</h2>
      <PieChart
        width={600}
        height={400}
        showYAxis
        backgroundColor="#eee"
        data={[
          ["Happy", 100],
          ["BirthDay", 90],
          ["To You", 60],
        ]}
        colors={["#3F38F5", "#24A805", "#A8450D"]}
      />
      <h2>TimeLine Chart</h2>
      <TimeLineChart
        width={800}
        height={300}
        showYAxis
        backgroundColor="#ccc"
        colors={["#ff0000", "#00ff00"]}
        data={[
          [
            new Date("2022-11-24T21:27:54.677Z"),
            new Date("2022-11-25T21:28:54.677Z"),
            new Date("2022-11-26T21:29:54.677Z"),
            new Date("2022-11-27T21:30:54.677Z"),
            new Date("2022-11-28T21:55:54.677Z"),
          ],
          [
            [100, 90, 60, 160, 30],
            [20, 40, 80, 60, 33],
          ],
        ]}
      />
      <h2>Line Chart</h2>
      <LineChart
        width={800}
        height={300}
        showYAxis
        backgroundColor="#ccc"
        colors={["#ff0000", "#00ff00"]}
        data={[
          ["Jan", "Feb", "Mar", "Apr", "May"],
          [
            [100, 90, 60, 160, 30],
            [20, 40, 80, 60, 33],
          ],
        ]}
      />
    </Page>
  );
};
export default ChartsExamples;
