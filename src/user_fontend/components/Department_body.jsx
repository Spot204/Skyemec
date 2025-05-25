import "../styles/Department.css";

const Department_body = ({ headers, notes, images }) => {
  return (
    <div className="Db-body">
      <h3>Thông tin chi tiết</h3>
      <div className="Department-sections">
        {headers.map((header, index) => (
          <div key={index} className={`Department-section ${index % 2 === 0 ? 'left' : 'right'}`}>
            {index % 2 === 0 ? (
              <>
                <img src={images[index]} alt={`image-${index}`} />
                <div className="Department-sections-text">
                  <h2>{header}</h2>
                  <p>{notes[0]}</p>
                  <p>{notes[1]}</p>
                  <p>{notes[2]}</p>
                </div>
              </>
            ) : (
              <>
                <div className="Department-sections-text">
                  <h2>{header}</h2>
                  <p>{notes[3]}</p>
                  <p>{notes[4]}</p>
                  <p>{notes[5]}</p>
                </div>
                <img src={images[index]} alt={`image-${index}`} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department_body;