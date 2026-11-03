import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { useApp } from "../hooks/useApp";

// Effects don't run during server rendering, so the hook stays in the state it
// has before the data is fetched and the search service is created.
function renderBeforeDataLoads(queryString) {
  let app;
  let isQuerySet = false;

  const Probe = () => {
    app = useApp();

    if (!isQuerySet) {
      isQuerySet = true;
      app.setQueryString(queryString);
    }

    return null;
  };

  renderToString(createElement(Probe));

  return app;
}

describe("useApp", () => {
  it("should not throw when submitting before the data has loaded", () => {
    const app = renderBeforeDataLoads("sol");

    expect(() => app.onSubmit()).not.toThrow();
  });
});
