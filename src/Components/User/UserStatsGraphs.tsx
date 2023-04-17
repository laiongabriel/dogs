import React from "react";
import styles from "../../Styles/User/UserStatsGraphs.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

interface UserStatsGraphsProps {
   data: {
      id: number;
      title: string;
      acessos: string;
   }[];
}

type Graph = {
   x: string;
   y: number;
};

const UserStatsGraphs = ({ data }: UserStatsGraphsProps) => {
   const [graph, setGraph] = React.useState<Graph[]>();
   const [total, setTotal] = React.useState(0);

   React.useEffect(() => {
      if (data && data.length) {
         const graphData = data.map((item) => {
            return {
               x: item.title,
               y: Number(item.acessos),
            };
         });

         setTotal(
            data
               .map((item) => Number(item.acessos))
               .reduce((prev, next) => prev + next)
         );
         setGraph(graphData);
      }
   }, [data]);

   if (data.length !== 0)
      return (
         <section className={`${styles.graph} animeLeft`}>
            <div className={`${styles.total} ${styles.graphItem}`}>
               <p>Total accesses: {total}</p>
            </div>
            <div className={styles.graphItem}>
               <VictoryPie
                  data={graph}
                  innerRadius={50}
                  padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
                  style={{
                     data: {
                        fillOpacity: 0.9,
                        stroke: "#fff",
                        strokeWidth: 2,
                     },
                     labels: {
                        fontSize: 14,
                        fill: "#333",
                     },
                  }}
               />
            </div>
            <div className={styles.graphItem}>
               <VictoryChart>
                  <VictoryBar alignment="start" data={graph}></VictoryBar>
               </VictoryChart>
            </div>
         </section>
      );
   else
      return (
         <h1>
            You don't have any statistics yet because you haven't posted any
            photos.
         </h1>
      );
};

export default UserStatsGraphs;
