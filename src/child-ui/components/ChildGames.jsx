import React from "react";

const Games = () => (
  <div className="container my-5">
   
    <div className="row justify-content-center">
      <div className="col-md-4 d-flex justify-content-center my-4">
        <iframe
          style={{ maxWidth: "100%" }}
          src="https://wordwall.net/ar/embed/4cd53b06c8fb4c4ea2badb9afaa3403f?themeId=1&templateId=5&fontStackId=0"
          width="350"
          height="300"
          frameBorder="0"
          allowFullScreen
          title="Wordwall Game 1"
        ></iframe>
      </div>

      <div className="col-md-4 d-flex justify-content-center my-4">
        <iframe
          style={{ maxWidth: "100%" }}
          src="https://wordwall.net/ar/embed/7725321b8b074fac9decdd872ccb441f?themeId=46&templateId=5&fontStackId=0"
          width="350"
          height="300"
          frameBorder="0"
          allowFullScreen
          title="Wordwall Game 2"
        ></iframe>
      </div>

      <div className="col-md-4 d-flex justify-content-center my-4">
        <iframe
          style={{ maxWidth: "100%" }}
          src="https://wordwall.net/ar/embed/78446e05235940a2a1624a93370fa448?themeId=2&templateId=38&fontStackId=0"
          width="350"
          height="300"
          frameBorder="0"
          allowFullScreen
          title="Wordwall Game 3"
        ></iframe>
      </div>

      <div className="col-md-4 d-flex justify-content-center my-4">
        <iframe
          style={{ maxWidth: "100%" }}
          src="https://wordwall.net/ar/embed/d4267d36dd894a3185c4844fa178a948?themeId=22&templateId=46&fontStackId=0"
          width="350"
          height="300"
          frameBorder="0"
          allowFullScreen
          title="Wordwall Game 4"
        ></iframe>
      </div>

      <div className="col-md-4 d-flex justify-content-center my-4">
        <iframe
          style={{ maxWidth: "100%" }}
          src="https://wordwall.net/ar/embed/2191f93f8acb435a88c4e3dd6fd175a8?themeId=1&templateId=46&fontStackId=0"
          width="300"
          height="250"
          frameBorder="0"
          allowFullScreen
          title="Wordwall Game 5"
        ></iframe>
      </div>
    </div>
  </div>
);

export default Games;
