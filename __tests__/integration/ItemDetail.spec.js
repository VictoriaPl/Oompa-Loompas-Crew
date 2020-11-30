import React from "react";
import { render, waitFor } from "@testing-library/react";
import ItemDetail from "../../src/pages/ItemDetail";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "2",
  }),
}));

jest.mock("axios");

test("ItemDetail, loads Item Detail info on mount", async () => {
  const testItem = {
    name: "Marcy",
    gender: "F",
    profession: "Developer",
    image: "testImage.png",
  };
  axios.get.mockResolvedValue(testItem);

  const { getByTestId } = render(<ItemDetail item={testItem} />);

  const loadingSkeleton = await waitFor(() =>
    getByTestId("loadingImg")
  );
  expect(loadingSkeleton).toBeInTheDocument();

  expect(axios.get).toHaveBeenCalledTimes(1);
});
