"use client";

import React from "react";
import { Button } from "./ui/button";

const CreateStoryForm = () => {
  return (
    <form
      className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground mt-4"
      action="/stories"
      method="post"
    >
      <textarea
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="prompt"
        rows={6}
        placeholder="Tell me a story about..."
      />
      <Button type="submit" className="w-80 m-auto text-center">
        Write!
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="ml-2 w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </Button>
    </form>
  );
};

export default CreateStoryForm;
