import React, { useState, useEffect } from "react";
import "./styles.scss";

import {
  commentsUrl,
  issueUrl,
  sidebarUrl,
  SidebarType,
  IssueType,
  CommentType,
  useData
} from "./data";

const LoadingSidebar = () => (
  <>
    <div className="sidebar-base">
      <div className="loading sidebar-loading" />
      <div className="loading sidebar-loading" />
      <div className="loading sidebar-loading" />
      <div className="loading sidebar-loading" />
    </div>
  </>
);

const LoadingIssue = () => (
  <>
    <div className="issue">
      <div className="loading issue-loading" style={{ height: "20rem" }} />
      <div className="loading issue-loading" />
    </div>
  </>
);

const LoadingScreen = () => {
  return (
    <div className="layout">
      <LoadingSidebar />
      <LoadingIssue />
    </div>
  );
};

const Sidebar = ({ data }: { data: SidebarType[] }) => {
  return (
    <div className="sidebar sidebar-base">
      <ul>
        {data.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

const Comments = ({ comments }: { comments: CommentType[] }) => {
  return (
    <div className="comments">
      <ul>
        {comments.map(({ id, comment }) => (
          <li key={id}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

const Issue = ({
  issue,
  comments
}: {
  issue: IssueType;
  comments?: CommentType[];
}) => {
  return (
    <div className="issue">
      <h3>{issue.author}</h3>
      <p>{issue.description}</p>
      {comments ? (
        <Comments comments={comments} />
      ) : (
        <div className="loading issue-loading" />
      )}
    </div>
  );
};

const useAllData = () => {
  const [sidebar, setSidebar] = useState<SidebarType[]>();
  const [comments, setComments] = useState<CommentType[]>();
  const [issue, setIssue] = useState<IssueType>();

  useEffect(() => {
    const dataFetch = async () => {
      fetch(sidebarUrl)
        .then((r) => r.json())
        .then((r) => setSidebar(r));
      fetch(issueUrl)
        .then((r) => r.json())
        .then((r) => setIssue(r));
      fetch(commentsUrl)
        .then((r) => r.json())
        .then((r) => setComments(r));
    };

    dataFetch();
  }, []);

  return { sidebar, comments, issue };
};

const App = () => {
  const { sidebar, issue, comments } = useAllData();

  if (!sidebar) return <LoadingScreen />;

  return (
    <div className="layout">
      <Sidebar data={sidebar} />
      {issue ? <Issue comments={comments} issue={issue} /> : <LoadingIssue />};
    </div>
  );
};

export default App;
