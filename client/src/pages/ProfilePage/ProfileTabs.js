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
  margin-bottom: 2px;
  width: 100%;
  padding: 15px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  text-align: center;
  color: var(--primary-color);
  font-size: 26px;
  font-weight: bolder;

  :hover {
    background-color: var(--thirdary-color);
    color: var(--secondary-color);
  }

  &.selected {
    border-bottom: 2px solid var(--thirdary-color);
  }
`;