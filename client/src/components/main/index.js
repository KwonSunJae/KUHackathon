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



function findCherries(el , pi) {
    return el.name === pi;
  }

const Main = () => {
    const [tablesData,setTablesData] = useState({
        A: [
            {
                name: "오감자",
                title: null,
                profileImg: null,
                uuid: "891cbd44-4988-4f1e-8c76-8a91374118fb"
            },
            {
                name: "Divers",
                title: null,
                profileImg: null,
                uuid: "c6518eaf-94e6-45c2-87fa-ab49cb4d38d7"
            },
            {
                name: "이름을 입력해주세요",
                title: null,
                profileImg: null,
                uuid: "9dfa2ba3-adc0-425a-8ddb-541ea0779545"
            },
            {
                name: "리멤버",
                title: null,
                profileImg: null,
                uuid: "f6082e12-9661-4105-af06-f94887b499b5"
            },
            {
                name: "급발진",
                title: null,
                profileImg: null,
                uuid: "31ab3d8e-b1ef-4f5d-8750-86f2d3ac7a23"
            },    
            ],B:[
                {
                    name: "풀악셀",
                    title: null,
                    profileImg: null,
                    uuid: "fec0f9e1-1bce-4b89-992c-a2cab33fbe52"
                },
                {
                    name: "한국인은_밥심",
                    title: null,
                    profileImg: null,
                    uuid: "258a1f35-8321-4a76-a0eb-9fdb669f13d5"
                },
                {
                    name: "칸쵸즈",
                    title: null,
                    profileImg: null,
                    uuid: "6dd1e3f6-3555-4792-ac20-702654eba9de"
                }, 
                {
                    name: "다섯이서왔스융",
                    title: null,
                    profileImg: null,
                    uuid: "4d04f173-f95a-40fb-9788-ae9383a784e2"
                },
               {
                    name: "MAZU(마주)",
                    title: null,
                    profileImg: null,
                    uuid: "45f14cd3-d929-4a65-8763-7dc52215562e"
                },            
            ],C:[
                {
                    name: "모카콩",
                    title: null,
                    profileImg: null,
                    uuid: "7298e7c7-a339-49e7-a9f0-29ecfcfb64c1"
                },
                {
                    name: "양봉",
                    title: null,
                    profileImg: null,
                    uuid: "c86b4263-6e15-4d1c-9a61-d5dd7a364b85"
                },
                {
                    name: "MZC",
                    title: null,
                    profileImg: null,
                    uuid: "c1a59418-eda4-4d23-8aa4-63aa235e8b6f"
                },
                {
                    name: "해커톤 전사들",
                    title: null,
                    profileImg: null,
                    uuid: "4ffb278d-330f-481b-a0ef-701aa10298fe"
                },
                {
                    name : "야 너두 요리할 수 있어",
                    title : null,
                    profileImg: null,
                    uuid: "196cd0f3-5679-4e17-86f8-e2774bb02d71"
                }, 
            ],D:[
                {
                    name: "해커톤 한입",
                    title: null,
                    profileImg: null,
                    uuid: "eee9a809-2ac7-40de-96c4-ef61f6855f4c"
                },
                {
                    name: "심포니",
                    title: null,
                    profileImg: null,
                    uuid: "abe23bf2-3075-496c-8503-06a3640fd78a"
                },
                {
                    name: "관호, 서진, 성현 Let's go",
                    title: null,
                    profileImg: null,
                    uuid: "e597eb1f-98dc-4673-a906-50cdf944d777"
                },
                {
                    name: "플레이스엑스(PLACE X)",
                    title: null,
                    profileImg: null,
                    uuid: "eee697f3-457d-4846-905d-4a6fb2a84e27"
                }, 
        ]
    });
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
        getMain().then(data=>{
           
            setTableList(data.teams);
            var newData = {
                A : [],
                B : [],
                C : [],
                D : [],
            }
            tablesData['A'].forEach(element => {
                console.log(data.teams.find((el)=> el.name === element.name));
                newData['A'].push(data.teams.find((el)=> el.name === element.name));
            });
            tablesData['B'].forEach(element => {
                console.log(data.teams.find((el)=> el.name === element.name));
                newData['B'].push(data.teams.find((el)=> el.name === element.name));
            });
            tablesData['C'].forEach(element => {
                console.log(data.teams.find((el)=> el.name === element.name));
                newData['C'].push(data.teams.find((el)=> el.name === element.name));
            });
            tablesData['D'].forEach(element => {
                console.log(data.teams.find((el)=> el.name === element.name));
                newData['D'].push(data.teams.find((el)=> el.name === element.name));
            });

            console.log(newData);
            setTablesData(newData);
        })
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

    const handleAuthSubmit = () => {
        // 여기서 실제 인증 로직을 수행하고, 인증에 성공하면 setIsAuthenticated(true)로 설정합니다.
        // 실제 코드에서는 서버와의 통신이 필요하며, 보안을 고려해야 합니다.
        const userInfo = {
            name : authName,
            pw : authPassword
        }
        getAuth(userInfo).then(data=>{
            if (data.uuid === 'error') {
                setAuthError(true);
            } else {
                console.log(data);
                const datas = JSON.parse(data);
                setIsAuthenticated(true);
                closeWriteModal(); // 작성하기 모달 닫기
                localStorage.setItem('name',authName);
                localStorage.setItem('pw',authPassword );
                localStorage.setItem('uuid', datas.uuid);
                setAuthError(false);
            }
        })
        .catch(e=>{
            console.log(e);
        })

        // 가상의 비밀번호 'mysecretpassword'로 인증 시도
        
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
                        <h1>{table.name}</h1>

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
