import "../styles/Department.css";

const Department_body = ({ headers, notes, images }) => {
  return (
    <div className="Db-body">
      <h3>Thông tin chi tiết</h3>
      <div className="Department-sections">
        {headers.map((header, index) => (
          <div
            key={index}
            className={`Department-section ${
              index % 2 === 0 ? "left" : "right"
            }`}
          >
            {index % 2 === 0 ? (
              <>
                <div className="Department-sections-text-item">
                  <img src={images[index]} alt={`image-${index}`} />
                  <div className="Department-sections-text">
                    <h2>{header}</h2>
                    <p>{notes[index*3+0]}</p>
                    <p>{notes[index*3+1]}</p>
                    <p>{notes[index*3+2]}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="Department-sections-text-item">
                  <div className="Department-sections-text">
                    <h2>{header}</h2>
                    <p>{notes[index*3+0]}</p>
                    <p>{notes[index*3+1]}</p>
                    <p>{notes[index*3+2]}</p>
                  </div>
                  <img src={images[index]} alt={`image-${index}`} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department_body;
