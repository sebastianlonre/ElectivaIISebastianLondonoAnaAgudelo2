import React, { useState } from "react";
import "../../Styles/modals/modals_styles.css";
import { Flex, Table } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

export const SocialModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleView = (tag) => {
    navigate(`/profile/${tag}`)
    onClose()
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const displayedData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <Flex className="modal-overlay" onClick={onClose}>
      <Flex className="modal-content" onClick={(e) => e.stopPropagation()} style={{ width: "400px", height: "400px" }}>
        <button className="modal-close" onClick={onClose}>X</button>

        <Flex direction="column" style={{ width: "100%", height: "100%" }}>
          <Table.Root style={{ width: "100%", flex: 1 }}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>User Tag</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {displayedData.map((item) => (
                <Table.Row key={item._id}>
                  <Table.RowHeaderCell>
                    {item.followingTag || item.followerTag}
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <button onClick={() => handleView(item.followingTag || item.followerTag)}>
                      View
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          <Flex justify="space-between" padding="10px">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
