import React, { useState, useEffect } from 'react';
import sendIcon from '../assets/send.png';
import back from '../assets/back.png';
import styles from './NotesArea.module.css';

// Component for managing notes within a selected group
const NotesArea = ({ groupSelect, groups, setGroups }) => {
  // State to manage individual note input
  const [note, setNote] = useState('');

  // State to manage screen size for responsive layout
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update screenSize when window resizes
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to update note value on user input
  const handleChange = (event) => {
    setNote(event.target.value);
  };

  // Function to add a new note to the group
  const handleSubmit = () => {
    const newGroups = [...groups];
    const currentGroup = newGroups[groupSelect.id];
    const dateTime = new Date();

    const newNote = {
      date: dateTime.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' }),
      time: dateTime.toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true }),
      note,
    };

    currentGroup.notes.push(newNote);
    localStorage.setItem('groups', JSON.stringify(newGroups));
    setGroups(newGroups);
    setNote(''); // Clear the input after submitting
  };

  // Handle Enter key press for submitting the note
  const handleKeyPress = (event) => {
    if (event.code === 'Enter') {
      handleSubmit();
    }
  };

  // Function to render note items
  const renderNotes = (notes) => notes.map((note, index) => (
    <div key={index} className={styles.DateAndText}>
      <div className={styles.DateAndTime}>
        <p className={styles.Time}>{note.time}</p>
        <p className={styles.Date}>{note.date}</p>
      </div>
      <p className={styles.Text}>{note.note}</p>
    </div>
  ));

  return (
    <div className={styles.notesContainer}>
      <div className={styles.notesHeader}>
        <img src={back} alt="Back" onClick={() => window.location.reload()} />
        <div className={styles.notesGroup} style={{ background: groupSelect.color }}>
          {groupSelect.groupName.slice(0, 2).toUpperCase()}
        </div>
        <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
      </div>
      <div className={screenSize.width < 989 ? styles.NotesAndDateMobile : styles.NotesAndDate}>
        {renderNotes(groupSelect.notes)}
      </div>
      <div className={screenSize.width < 989 ? styles.TextareaMobile : styles.Textarea}>
        <textarea
          className={screenSize.width < 989 ? styles.TextInputMobile : styles.TextInput}
          value={note}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="Enter your text here..."
        />
        <img src={sendIcon} className={screenSize.width < 989 ? styles.SendImgMobile : styles.SendImg} alt="Send" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default NotesArea;
