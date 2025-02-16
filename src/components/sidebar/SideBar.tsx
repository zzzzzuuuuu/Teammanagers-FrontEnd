import styled from 'styled-components';
import Open from '@assets/sidebar/drop-down-open.svg';
import Home from '@assets/sidebar/home.svg';
import HomeClick from '@assets/sidebar/home-click.svg';
import Bell from '@assets/sidebar/bell.svg';
import BellClick from '@assets/sidebar/bell-click.svg';
import List from '@assets/sidebar/list.svg';
import ListClick from '@assets/sidebar/list-click.svg';
import Calendar from '@assets/sidebar/calendar.svg';
import CalendarClick from '@assets/sidebar/calendar-click.svg';
import Memo from '@assets/sidebar/memo.svg';
import MemoClick from '@assets/sidebar/memo-click.svg';
import File from '@assets/sidebar/file.svg';
import FileClick from '@assets/sidebar/file-click.svg';
import Team from '@assets/sidebar/team.svg';
import TeamClick from '@assets/sidebar/team-click.svg';
import MyPage from '@assets/sidebar/mypage.svg';
import MyPageClick from '@assets/sidebar/mypage-click.svg';
import End from '@assets/sidebar/end.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DropDown } from '@components/sidebar/DropDown.tsx';
import Alarm from '@components/alarm/alarm';
import { useGetAlarmList } from '@hooks/alarm/useGetAlarmList';
import { getMyTeam } from '@apis/management.ts';
import { TeamProps } from '../../types/management.ts';
import { useIdStore } from '@store/idStore.ts';

export const SideBar = () => {
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const [currentTeam, setCurrentTeam] = useState<TeamProps | null>(null);
  const [hover, setHover] = useState<boolean>(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError } = useGetAlarmList(
    Number(localStorage.getItem('teamId')) || null
  );

  const { teamId, setTeamId } = useIdStore((state) => ({
    teamId: state.teamId,
    setTeamId: state.setTeamId
  }));

  const getTeamId = () => {
    const id = localStorage.getItem('teamId');
    setTeamId(Number(id));
  };

  useEffect(() => {
    getTeamId();
  }, [teamId]);

  // const teamId = Number(localStorage.getItem('teamId'));
  const { result } = useGetAlarmList(teamId);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const toggleAlarm = () => {
    setIsAlarmOpen(!isAlarmOpen);
    setHover(false);
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getMyTeam();
        setTeams(response);

        // 현재 속한 팀 아이디에 해당하는 팀을 찾음
        const foundTeam = response.find(
          (team: TeamProps) => team.teamId === teamId
        );
        if (foundTeam) {
          setCurrentTeam(foundTeam);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, [teamId]);

  if (isLoading) {
    return null;
  }

  return (
    <SideBarContainer
      isHovered={hover || isAlarmOpen}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
        setShowDropDown(false);
      }}
    >
      <LogoContainer>
        {currentTeam && (
          <>
            <LogoImg src={currentTeam.imageUrl} />
            {hover && (
              <DropDownContainer>
                <LogoText>{currentTeam.title}</LogoText>
                <Wrapper onClick={handleDropDown}>
                  <Open />
                </Wrapper>
              </DropDownContainer>
            )}
          </>
        )}
      </LogoContainer>
      {showDropDown && (
        <DropDown
          teams={teams}
          currentTeam={currentTeam}
          onTeamSelected={setCurrentTeam}
        />
      )}
      <Hr style={{ margin: '11px 0 11px 0' }} />
      <IconContainer
        onClick={() => {
          handleNavigate(`/`);
        }}
        selected={isActive(`/`)}
        isHovered={hover}
      >
        {isActive(`/`) ? <HomeClick /> : <Home />}
        {hover && <SideBarText selected={isActive(`/`)}>홈</SideBarText>}
      </IconContainer>
      {/*  현재 알림페이지가 없다... 일단 일시적으로 홈으로 라우팅 */}
      <IconContainer
        onClick={() => setIsAlarmOpen(!isAlarmOpen)}
        selected={isAlarmOpen}
        isHovered={hover}
      >
        {isAlarmOpen ? <BellClick /> : <Bell />}
        {hover && <SideBarText selected={isAlarmOpen}>알림</SideBarText>}
        <Alarm
          data={data?.result.alarmList}
          isAlarmOpen={isAlarmOpen}
          toggleAlarm={toggleAlarm}
          setHover={setHover}
        />
      </IconContainer>
      <IconContainer
        onClick={() => {
          handleNavigate(`/todo-list`);
        }}
        selected={isActive(`/todo-list`)}
        isHovered={hover}
      >
        {isActive(`/todo-list`) ? <ListClick /> : <List />}
        {hover && (
          <SideBarText selected={isActive(`/todo-list`)}>
            투두리스트
          </SideBarText>
        )}
      </IconContainer>
      <IconContainer
        onClick={() => {
          handleNavigate(`/calendar`);
        }}
        selected={isActive(`/calendar`)}
        isHovered={hover}
      >
        {isActive(`/calendar`) ? <CalendarClick /> : <Calendar />}
        {hover && (
          <SideBarText selected={isActive(`/calendar`)}>캘린더</SideBarText>
        )}
      </IconContainer>
      <Hr />
      <IconContainer
        onClick={() => {
          navigate(`/memo`);
        }}
        selected={isActive(`/memo`)}
        isHovered={hover}
      >
        {isActive(`/memo`) ? <MemoClick /> : <Memo />}
        {hover && <SideBarText selected={isActive(`/memo`)}>메모</SideBarText>}
      </IconContainer>
      <IconContainer
        onClick={() => {
          handleNavigate(`/share`);
        }}
        selected={isActive(`/share`)}
        isHovered={hover}
      >
        {isActive(`/share`) ? <FileClick /> : <File />}
        {hover && (
          <SideBarText selected={isActive(`/share`)}>자료실</SideBarText>
        )}
      </IconContainer>
      <Hr />
      <IconContainer
        onClick={() => {
          handleNavigate(`/management`);
        }}
        selected={isActive(`/management`)}
        isHovered={hover}
      >
        {isActive(`/management`) ? <TeamClick /> : <Team />}
        {hover && (
          <SideBarText selected={isActive(`/management`)}>팀 관리</SideBarText>
        )}
      </IconContainer>
      <Hr />
      <IconContainer
        onClick={() => {
          handleNavigate(`/mypage`);
        }}
        selected={isActive(`/mypage`)}
        isHovered={hover}
      >
        {isActive(`/mypage`) ? <MyPageClick /> : <MyPage />}
        {hover && (
          <SideBarText selected={isActive(`/mypage`)}>마이페이지</SideBarText>
        )}
      </IconContainer>
      <IconContainer
        onClick={() => {
          //   추후에 path 수정이 필요할 수 있음
          handleNavigate(`/management`);
        }}
        isHovered={hover}
      >
        <End />
        {hover && (
          <SideBarText selected={isActive(`/management`)} redText>
            프로젝트
            <br />
            종료
          </SideBarText>
        )}
      </IconContainer>
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div<{ isHovered: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: ${({ isHovered }) => (isHovered ? '158px' : '73px')};
  height: 832px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  transition: width 0.3s ease;
  box-shadow: 4px 0 16px 0 rgba(0, 0, 0, 0.06);
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 49px;
  gap: 19px;
`;

const DropDownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 71px;
  height: 20px;
  gap: 8px;
`;

const LogoText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 40px; // 텍스트 최대 너비 설정
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface SelectedProps {
  selected?: boolean;
  redText?: boolean;
  isHovered?: boolean;
}

const SideBarText = styled.p<SelectedProps>`
  font-size: 12px;
  font-weight: ${(isActive) => (isActive ? 700 : 400)};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.black : theme.colors.darkGray};
  margin-left: 18px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;

  ${({ redText, theme }) =>
    redText &&
    `
    color: ${theme.colors.red};
  `}
`;

const IconContainer = styled.div<SelectedProps>`
  width: 100%;
  height: 51px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.background : 'white'};
  display: flex;
  justify-content: ${({ isHovered }) => (isHovered ? 'flex-start' : 'center')};
  padding-left: ${({ isHovered }) => (isHovered ? '19px' : '0')};
  box-sizing: border-box;
  overflow: hidden;
  align-items: center;
  cursor: pointer;
  transition: width 0.3s ease;

  &:last-child {
    margin-top: 18px;
  }
`;

const LogoImg = styled.img`
  width: 37px;
  height: 37px;
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.subLightBlue};
  margin: 11px 0 11px 0;
`;
