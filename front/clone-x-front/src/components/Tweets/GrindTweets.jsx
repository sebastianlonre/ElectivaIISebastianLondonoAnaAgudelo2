import React, { useState } from "react";
import { Spinner, Flex, Button } from "@radix-ui/themes";
import { ViewTweets } from "./ViewTweets";

export const GrindTweets = ({ tweetData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  if (!tweetData || tweetData.length === 0) {
    return (
      <Flex justify="center" align="center">
        <Spinner size="3" />
      </Flex>
    );
  }

  const totalPages = Math.ceil(tweetData.length / itemsPerPage);
  const displayedTweets = tweetData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <hr />
      {displayedTweets.length > 0 ? (
        displayedTweets.map((tweet) => (
          <ViewTweets key={tweet._id} tweet={tweet} />
        ))
      ) : (
        <div>Not found tweets, follow a user or publish a tweet.</div>
      )}

      <Flex gap="8" p="3" justify="center">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </Button>
      </Flex>
    </>
  );
};
