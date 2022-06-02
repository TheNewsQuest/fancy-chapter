import React from "react";
import styles from "./SwitchTab.module.scss";
import { Tabs } from "antd";
import MultipleChoice from "../MultipleChoice";
import ShortAnswer from "../ShortAnswer";
import { Article } from "src/types/article";

const { TabPane } = Tabs;
let short_answer_mock_data = [
  {
    question: "What is the famous genre of music in 2022?",
    answer: "Pop",
  },
  {
    question: "How old is the Earth?",
    answer: "4.543 billion years",
  },
];
let multiple_choice_mock_data = [
  {
    question: "Who created Python?",
    answers: [
      "Guido van Rossum",
      "David Beckham",
      "David Copperfield",
      "Robin Van Persie",
    ],
    correctAnswerIndex: 2,
    // userChoice: -1
  },
  {
    question: "Is Python a programming language or an animal?",
    answers: ["A programming language", "An animal"],
    correctAnswerIndex: 1,
    // userChoice: -1
  },
];

const onChange = (key: string) => {
  console.log(key);
}

interface SwitchTabProps {
    article: Article;
}

const SwitchTab: React.FC<SwitchTabProps> = ({article}) => {
  console.log("Switch tab");
  console.log(article);
  
  
  return (
      <div className={styles["tab-container"]}>
        <Tabs type="card" centered={true} defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="Multiple Choice" key="1">
            {article ? <MultipleChoice list={article.quests} /> : ""}
          </TabPane>
          <TabPane tab="Short Answer" key="2">
            {article ? <ShortAnswer shortAnswerList={article.quests} /> : ""}
            {/* <ShortAnswer shortAnswerList={short_answer_mock_data} /> */}
          </TabPane>
        </Tabs>
      </div>
  );
};

export default SwitchTab;
