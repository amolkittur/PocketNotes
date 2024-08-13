import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';

// Define a component named Modal that takes props as parameters
const Modal = (props) => {
  // State to manage form data with default values
  const [formData, setFormData] = useState({ grpName: '', color: '' });

  // State to manage screen size
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // List of possible colors for groups
  const colorOptions = [
    '#B38BFA', '#FF79F2', '#43E6FC', 
    '#F19576', '#0047FF', '#6691FF',
  ];

  // Update screen size state on window resize
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Handle changes in text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle changes in color selection
  const handleChangeColor = (e) => {
    const color = e.target.getAttribute('color');
    setFormData({ ...formData, color: color });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.color) {
      alert('Please select a color');
      return;
    }

    const newGroup = {
      groupName: formData.grpName,
      color: formData.color,
      notes: [],
      id: props.groups.length,
    };

    // Add the new group to the existing groups and update local storage
    props.setGroups([...props.groups, newGroup]);
    localStorage.setItem('groups', JSON.stringify([...props.groups, newGroup]));

    // Close modal
    props.closeModal(false);
  };

  // Render the modal based on screen size
  return (
    <>
      {screenSize.width < 989 ? (
        <div className={styles.modalBackgroundMobile}>
          <div className={styles.modalContainerMobile}>
            <button
              className={styles.closeButtonMobile}
              onClick={() => props.closeModal(false)}
            >
              X
            </button>
            <h2 className={styles.modalHeading}>Create New Group</h2>
            <input
              type="text"
              className={styles.modalTextMobile}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            {colorOptions.map((color, index) => (
              <button
                key={index}
                className={`${styles.colorButton} ${formData.color === color ? 'selected' : ''}`}
                name="color"
                color={color}
                style={{
                  background: color,
                  borderRadius: '25px',
                }}
                onClick={handleChangeColor}
              />
            ))}
            <button
              className={styles.modalCreateMobile}
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.modalBackground}>
          <div className={styles.modalContainer}>
            <button
              className={styles.closeButton}
              onClick={() => props.closeModal(false)}
            >
              X
            </button>
            <h2 className={styles.modalHeading}>Create New Group</h2>
            <input
              type="text"
              className={styles.modalText}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            {colorOptions.map((color, index) => (
              <button
                key={index}
                className={`${styles.colorButton} ${formData.color === color ? 'selected' : ''}`}
                name="color"
                color={color}
                style={{
                  background: color,
                  borderRadius: '25px',
                }}
                onClick={handleChangeColor}
              />
            ))}
            <button
              className={styles.modalCreate}
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
