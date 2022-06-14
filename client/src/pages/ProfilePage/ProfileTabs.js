import styled from "styled-components";

const ProfileTabs = ({ title, setCurrentTab, currentTab }) => {
  return (
    <>
      <Tab
        className={currentTab === title ? "selected" : null}
        onClick={() => {
          setCurrentTab(title);
        }}
      >
        {title}
      </Tab>
    </>
  );
};

export default ProfileTabs;

const Tab = styled.div`
  padding-top: 15px;
  padding-bottom: 10px;
  margin-bottom: 2px;
  border: 2px solid blue;
  /* border-bottom: 2px solid transparent; */

  &.selected {
    border-bottom: 2px solid purple;
  }
`;
