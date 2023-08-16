import React, { useEffect, useState } from 'react';
import './index.css';
import Profile from '../profileModal';
import View from '../viewModal/inedx';
import { getMain,getTeam,getAuth,updateTeam } from '../../apis/team';
// 모달 컴포넌트
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal">
            <div className="modal-content">
                {children}
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};


const tablesData = {
    A: [
        '오감자', 'Divers', '이름을 입력해주세요', '리멤버', '급발진'
    ],
    B: [
        '풀악셀', '한국인은_밥심', '칸쵸즈', '다섯이서왔스융', 'MAZU(마주)'
    ],
    C: [
        '모카콩', '양봉', 'MZC', '해커톤 전사들', '야 너두 요리할 수 있어'
    ],
    D: [
        '해커톤 한입', '심포니', '관호, 서진, 성현 Let\'s go', '플레이스엑스(PLACE X)'
    ]
};


const Main = () => {
    const [selectedSector, setSelectedSector] = useState('A');
    const [selectedTable, setSelectedTable] = useState(null);
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSelectModalOpen , setIsSelectModalOpen] = useState(false);
    const [tableList ,setTableList] = useState([]);
    const [authName,setAuthName] = useState('');

    useEffect(()=>{
        const check = localStorage.getItem('name');
        if(check==null){
            console.log('firstLogin!');
            openWriteModal()
        }
    },[]);

    const handleSectorChange = (sector) => {
        setSelectedSector(sector);
    };

    const handleTableClick = (table) => {
        setSelectedTable(table);
        const savedInfo = localStorage.getItem('name');
        if(savedInfo === table){
            console.log(savedInfo)
            console.log(table);
            setIsAuthenticated(true);
            openWriteModal();
            
        }
        else{
            
            openViewModal();
        }
        
    };
    const openSelectModal = ()=>{
        setIsSelectModalOpen(true);
    };
    const closeSelectModal = ()=>{
        setIsSelectModalOpen(false);
    };

    const openWriteModal = () => {
        setIsWriteModalOpen(true);
    };

    const closeWriteModal = () => {
        setIsWriteModalOpen(false);
    };

    const openViewModal = () => {
        setIsViewModalOpen(true);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
    };

    const [authPassword, setAuthPassword] = useState(''); // 입력한 비밀번호를 상태로 관리
    const [authError, setAuthError] = useState(false); // 인증 실패 여부

    const handleAuthSubmit = async () => {
        // 여기서 실제 인증 로직을 수행하고, 인증에 성공하면 setIsAuthenticated(true)로 설정합니다.
        // 실제 코드에서는 서버와의 통신이 필요하며, 보안을 고려해야 합니다.
        const userInfo = {
            name : authName,
            pw : authPassword
        }
        const data =await getAuth(userInfo);

        // 가상의 비밀번호 'mysecretpassword'로 인증 시도
        if (data.uuid === 'error') {
            setAuthError(true);
        } else {
            
            setIsAuthenticated(true);
            closeWriteModal(); // 작성하기 모달 닫기
            localStorage.setItem('name',authName);
            localStorage.setItem('pw',authPassword );
            localStorage.setItem('uuid', data.uuid);
            setAuthError(false);
        }
    };

    return (
        <div>
            {/* 섹터 선택 탭 */}
            <div className="sector-tabs">
                {Object.keys(tablesData).map((sector) => (
                    <button
                        key={sector}
                        onClick={() => handleSectorChange(sector)}
                        className={selectedSector === sector ? 'active' : ''}
                    >
                        Sector {sector}
                    </button>
                ))}
            </div>

            {/* 선택된 섹터의 테이블 목록 */}
            <div className="table-list">
                {tablesData[selectedSector].map((table, index) => (
                    <div key={index} className="table-item"  onClick={() => handleTableClick(table)}>
                        
                        <img src='http://localhost:3000/image?url=https://github.com/KwonSunJae/CLOUD_AI_WEB_BATMAN_BATNAM_2021/raw/master/logo.png' ></img>
                        <h1>{table}</h1>

                    </div>
                ))}
            </div>
            {/*  작성 또는 감상 선택 모달 */}
            {/* <Modal isOpen={isSelectModalOpen} onClose={closeSelectModal}>
                <div>
                    <h3>{selectedTable}</h3>
                    <button onClick={openWriteModal}>작성하기</button>
                    <button onClick={openViewModal}>감상하기</button>
                </div>
            </Modal> */}

            {/* 작성하기 모달 */}
            <Modal isOpen={isWriteModalOpen} onClose={closeWriteModal}>
                {isAuthenticated ? (
                    <div>
                        <Profile/>
                    </div>
                ) : (
                    <div>
                        <h3> 팀 인증 필요!</h3>
                        <input
                            type="name"
                            placeholder="팀명"
                            value={authName}
                            onChange={(e) => setAuthName(e.target.value)}
                        />
                        <input
                            type="pw"
                            placeholder="비밀번호"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                        />
                        <button onClick={handleAuthSubmit}>인증</button>
                        {authError && <p style={{ color: 'red' }}>비밀번호가 올바르지 않습니다.</p>}
                    </div>
                )}
            </Modal>

            {/* 감상하기 모달 */}
            <Modal isOpen={isViewModalOpen} onClose={closeViewModal}>
                <div>
                    <h3>{selectedTable} 감상하기</h3>
                    {/* 테이블 조회 API를 통해 데이터를 가져와서 보여줌 */}
                    <View url= 'http://localhost:3000/image?url=https://raw.githubusercontent.com/KwonSunJae/CLOUD_AI_WEB_BATMAN_BATNAM_2021/master/readme.md'/>
                </div>
            </Modal>
        </div>
    );
};

export default Main;
