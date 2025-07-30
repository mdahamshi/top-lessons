import React, { useState, useEffect } from "react";

export const issueUrl =
  "https://api-sage-two-60.vercel.app/mocks/issues/1?delay=2000";

export type IssueType = {
  id: string;
  description: string;
  author: string;
};

export const sidebarUrl =
  "https://api-sage-two-60.vercel.app/mocks/sidebar?delay=1000";

export type SidebarType = {
  id: string;
  name: string;
};

export const commentsUrl =
  "https://api-sage-two-60.vercel.app/mocks/comments?delay=3000";

export type CommentType = {
  id: string;
  comment: string;
};

export const useData = <T extends unknown>(url: string) => {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch(url)).json();

      setState(data);
    };

    dataFetch();
  }, [url]);

  return { data: state };
};
