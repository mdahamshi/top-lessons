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

const CommentsContext = React.createContext<CommentType[] | undefined>([]);
const IssueContext = React.createContext<IssueType | undefined>(
  {} as IssueType
);
const SidebarContext = React.createContext<SidebarType[] | undefined>([]);

const useComments = () => React.useContext(CommentsContext);
const useIssue = () => React.useContext(IssueContext);
const useSidebar = () => React.useContext(SidebarContext);

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebar, setSidebar] = useState<SidebarType[]>();

  useEffect(() => {
    const dataFetch = async () => {
      fetch(sidebarUrl)
        .then((r) => r.json())
        .then((r) => setSidebar(r));
    };

    dataFetch();
  }, []);

  return (
    <SidebarContext.Provider value={sidebar}>
      {children}
    </SidebarContext.Provider>
  );
};

const IssueProvider = ({ children }: { children: React.ReactNode }) => {
  const [issue, setIssue] = useState<IssueType>();

  useEffect(() => {
    const dataFetch = async () => {
      fetch(issueUrl)
        .then((r) => r.json())
        .then((r) => setIssue(r));
    };

    dataFetch();
  }, []);

  return (
    <IssueContext.Provider value={issue}>{children}</IssueContext.Provider>
  );
};

const CommentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [comments, setComments] = useState<CommentType[]>();

  useEffect(() => {
    const dataFetch = async () => {
      fetch(commentsUrl)
        .then((r) => r.json())
        .then((r) => setComments(r));
    };

    dataFetch();
  }, []);

  return (
    <CommentsContext.Provider value={comments}>
      {children}
    </CommentsContext.Provider>
  );
};

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

const Sidebar = () => {
  const data = useSidebar();

  return (
    <div className="sidebar sidebar-base">
      <ul>
        {data?.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

const Comments = () => {
  const comments = useComments();

  return (
    <div className="comments">
      <ul>
        {comments?.map(({ id, comment }) => (
          <li key={id}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

const Issue = () => {
  const issue = useIssue();
  const comments = useComments();

  return (
    <div className="issue">
      <h3>{issue?.author}</h3>
      <p>{issue?.description}</p>
      {comments ? <Comments /> : <div className="loading issue-loading" />}
    </div>
  );
};

const App = () => {
  const sidebar = useSidebar();
  const issue = useIssue();

  if (!sidebar) return <LoadingScreen />;

  return (
    <div className="layout">
      <Sidebar />
      {issue ? <Issue /> : <LoadingIssue />};
    </div>
  );
};

export default () => (
  <SidebarProvider>
    <IssueProvider>
      <CommentsProvider>
        <App />
      </CommentsProvider>
    </IssueProvider>
  </SidebarProvider>
);
