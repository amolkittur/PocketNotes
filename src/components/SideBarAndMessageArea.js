import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notes from './NotesArea';
import banner from '../assets/Banner.png';
import lock from '../assets/lock.png';
import './SideBarAndMessageArea.css'; 

// SideBar component that manages the groups and modal operations
const SideBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [groupSelect, setGroupSelect] = useState(null);
  const [groups, setGroups] = useState([]);

  // Function to get the current screen size
  const getScreen = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    // Updates the screen size on window resize
    const handleResize = () => {
      setScreenSize(getScreen());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

    // Function to fetch groups from local storage
    const fetchGroups = async () => {
      const storedGroups = localStorage.getItem('groups');
      if (storedGroups) {
        setGroups(JSON.parse(storedGroups));
      }
    };

    fetchGroups();
  }, []);

  // Handler for group selection
  const handleGroupClick = (group) => {
    setGroupSelect(group);
  };

  return (
    <>
      {screenSize.width < 989 ? (
        // Mobile sidebar container
        <div className="sidebarContainerMobile">
          {groupSelect ? (
            // Notes component for the selected group
            <Notes groupSelect={groupSelect} groups={groups} setGroups={setGroups} />
          ) : (
            <>
              <h1 className="headingMobile">Pocket Notes</h1>
              <button className="CreateButtonMobile" onClick={() => setOpenModal(true)}>
                + Create Notes Group
              </button>
              <div className="GroupList">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className={`groupItem ${groupSelect === group ? 'selected' : ''}`}
                    onClick={() => handleGroupClick(group)}
                  >
                    <div className="groupIcon" style={{ background: group.color }}>
                      {group.groupName?.slice(0, 2)?.toUpperCase()}
                    </div>
                    <h2 className="groupName">{group.groupName}</h2>
                  </div>
                ))}
              </div>
            </>
          )}

          {openModal && <Modal closeModal={setOpenModal} setGroups={setGroups} groups={groups} />}
        </div>
      ) : (
        // Desktop sidebar container
        <>
          <div className="sidebarContainer">
            <h1 className="heading">Pocket Notes</h1>
            <button className="CreateButton" onClick={() => setOpenModal(true)}>
              + Create Notes Group
            </button>
            <div className="GroupList">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`groupItem ${groupSelect === group ? 'selected' : ''}`}
                  onClick={() => handleGroupClick(group)}
                >
                  <div className="groupIcon" style={{ background: group.color }}>
                    {group.groupName?.slice(0, 2)?.toUpperCase()}
                  </div>
                  <h2 className="groupName">{group.groupName}</h2>
                </div>
              ))}
            </div>
          </div>
          {openModal && <Modal closeModal={setOpenModal} setGroups={setGroups} groups={groups} />}
          <div className="MessageAreaContainer">
            {groupSelect ? (
              <Notes groupSelect={groupSelect} groups={groups} setGroups={setGroups} />
            ) : (
              // Default message area when no group is selected
              <div className="MessageAreaText">
                <img src={banner} alt="Banner" />
                <h2 className="MessageAreaHeading">PocketNotes</h2>
                <p className="MessageAreaDescription">
                  Send and receive messages without keeping your phone online.
                  <br /> Use Pocket Notes on up to 4 linked devices and 1 phone.
                </p>
                <footer className="MessageAreaFooter">
                  <img src={lock} alt="Security Lock" /> end-to-end encrypted
                </footer>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SideBar;
