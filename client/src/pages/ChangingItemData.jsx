import { useContext, useState, useEffect } from "react";
import { Alert, Button, Form, Row, Col, Stack, Card,Container } from "react-bootstrap";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import Logo from "../component/Logo";
import { useNavigate, useParams } from "react-router-dom";


const ChangingItemData = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const { 
        updaterItem,
        updaterItemInfo,
        updateItemUpdaterInfo,
        isUpdateItemLoading,
        updateItemError,
        findItem,
        findItemError,
        isFindItemLoading,
    } = useContext(AuthItemContext);
    const [item, setItem] = useState(null)
    const { 
        user
    } = useContext(AuthContext);

    const [bedExist, setBedExist] = useState(false);
    const [hasItems, setHasItems] = useState({
        hasWasher : false,
        hasDryer : false, 
        hasTV : false, 
        hasAirConditioner : false, 
        hasHeater : false, 
        hasBlinds : false,
        hasDresser: false,
        hasMicrowave: false,
        hasFridge: false,
        hasSofa: false,            
        hasChair: false,});
    
    const onChangebedExist = (e) => {
        const checked = e.target.checked
        setBedExist(checked);
        () => updateItemUpdaterInfo({ bedSize: checked? updaterItemInfo.bedSize: "" })
    };

    const onChangeCheckbox = (e) => {
        const { name, checked } = e.target;
        setHasItems((prevState) => {
            const newState = {...prevState, [name]:checked};
            return newState;
        });
    };

    useEffect(() => {
        updateItemUpdaterInfo({ hasItems});
    },[hasItems]);

    useEffect(() => {
        updateItemUpdaterInfo({bedSize: bedExist? updaterItemInfo.bedSize: "" })
    }, [bedExist])

    useEffect(() => {
        const fetchItem = async () => {
            if (!findItemError && !isFindItemLoading){
                const result = await findItem(id);

                setItem(result);
            }
        };
        fetchItem();
    }, [findItem, findItemError]);

    if (isFindItemLoading){
        return <div>Loding...</div>
    }
    if (findItemError || !item){
        return <div>Error: {findItemError?.message || 'Page not found'}</div>
    }

    if (!user || user._id !== item.ownerId){
        return <h1 style = {{color: 'red'}}>접근 권한이 없습니다.</h1>
    }

    return (<>
        <div>
            <div className = "logo"><Logo /></div>
            <Form className="noto-sans-kr" onSubmit={(e) => updaterItem(e, id)}>
                <Row style={{
                    height: "100%",
                    justifyContent: "Center",
                    paddingTop: "10px",
                    paddingBottom:"10%"
                }}>
                    <Col xs={8}>
                        <Stack gap={3}>
                        
                        <h2 style={{marginBottom: '15px'}}>매물 정보 변경</h2>
                        <Form.Control
                                type="file"
                                style = {{marginBottom: '10px'}}
                                onChange={(e) => updateItemUpdaterInfo({ imageFile: e.target.files[0] })}
                        />
                        <Form.Group className='formControl'>
                            <Form.Label>매물 주소</Form.Label>
                            <Form.Label className='blueFont'>{item.location}</Form.Label>
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>상세 주소</Form.Label>
                            <Form.Label className='blueFont'>{item.houseAddress}</Form.Label>
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>우편번호</Form.Label>
                            <Form.Label className='blueFont'>{item.zipCode}</Form.Label>
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>매물 종류</Form.Label>
                            <Form.Label className='blueFont'>{item.type}</Form.Label>
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>공급 면적</Form.Label>
                            <Form.Label className='blueFont'>{item.area}평</Form.Label>
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>층</Form.Label>
                            <Form.Label className='blueFont'>{item.floor}층</Form.Label>
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>월세</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="단위: 만원/월"
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({ housePrice: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>보증금</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="단위: 만원"
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({ deposit: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>방 개수</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="방 개수"
                            onChange={ 
                                (e) => updateItemUpdaterInfo({ room: e.target.value })
                            } />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>화장실 개수</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="화장실 개수"
                            onChange={ 
                                (e) => updateItemUpdaterInfo({ bathroom: e.target.value })
                            } />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>총 주차대수</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="총 주차대수"
                            onChange={ 
                                (e) => updateItemUpdaterInfo({ parkingSpace: e.target.value })
                            } />
                        </Form.Group>
                        <div className='checkContainer'>
                        <div className='groupLeft'>
                        <Card className = 'radioCheck'>
                        <Form.Group className = 'formGroupRight'>
                            <Form.Label>방향</Form.Label>
                            <Form.Check 
                            type="radio" 
                            label = '남향'
                            name = 'facing'
                            value = '남향'
                            checked = {updaterItemInfo.facing === '남향'}
                            onChange={ 
                                (e) => updateItemUpdaterInfo({ facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '남동향'
                            name = 'facing'
                            value = '남동향'
                            checked = {updaterItemInfo.facing === '남동향'}
                            onChange={ 
                                (e) => updateItemUpdaterInfo({ facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '동향'
                            name = 'facing'
                            value = '동향'
                            checked = {updaterItemInfo.facing === '동향'}
                            onChange={ 
                                (e) => updateItemUpdaterInfo({ facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '북동향'
                            name = 'facing'
                            value = '북동향'
                            checked = {updaterItemInfo.facing === '북동향'}
                            onChange={ 
                                (e) => updateItemUpdaterInfo({ facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '북향'
                            name = 'facing'
                            value = '북향'
                            checked = {updaterItemInfo.facing === '북향'}
                            onChange={ 
                                (e) => updateItemUpdaterInfo({ facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '북서향'
                            name = 'facing'
                            value = '북서향'
                            checked = {updaterItemInfo.facing === '북서향'}
                            onChange={ 
                                (e) => updateItemUpdaterInfo({ facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '서향'
                            name = 'facing'
                            value = '서향'
                            checked = {updaterItemInfo.facing === '서향'}
                            onChange={ 
                                (e) => updateItemUpdaterInfo({ facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '남서향'
                            name = 'facing'
                            value = '남서향'
                            checked = {updaterItemInfo.facing === '남서향'}
                            onChange={ 
                                (e) => updateItemUpdaterInfo({ facing: e.target.value })
                            } />
                        </Form.Group>
                        </Card>
                        </div>
                        <div className = 'groupRight'>
                        <Card className = 'radioCheck'>
                            <Form.Group>
                                <Form.Label>엘리베이터 여부</Form.Label>
                                <Form.Check 
                                type="radio" 
                                label = '엘리베이터 있음'
                                name = 'elevater'
                                value = 'true'
                                checked = {updaterItemInfo.elevator === true}
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({ elevator: e.target.value === 'true' })
                                } />
                                <Form.Check 
                                type="radio" 
                                label = '엘리베이터 없음'
                                name = 'elevater'
                                value = 'false'
                                checked = {updaterItemInfo.elevator === false}
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({ elevator: e.target.value === 'true' })
                                } />
                            </Form.Group>
                        </Card>
                        <Card className = 'radioCheck'>
                            <Form.Group>
                                <Form.Label>복층 여부</Form.Label>
                                <Form.Check 
                                type="radio" 
                                label = '단층'
                                name = 'story'
                                value = 'false'
                                checked = {updaterItemInfo.duplexAvailability === false}
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({ duplexAvailability: e.target.value === 'true' })
                                } />
                                <Form.Check 
                                type="radio" 
                                label = '복층'
                                name = 'story'
                                value = 'true'
                                checked = {updaterItemInfo.duplexAvailability === true}
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({ duplexAvailability: e.target.value === 'true'? true:false  })
                                } />
                            </Form.Group>
                        </Card>
                        <Card className = 'radioCheck'>
                            <Form.Group>
                                <Form.Label>반려 동물 가능 여부</Form.Label>
                                <Form.Check 
                                type="radio" 
                                label = '가능'
                                name = 'pet'
                                value = 'true'
                                checked = {updaterItemInfo.petFriendly === true}
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({petFriendly: e.target.value === 'true'? true:false })
                                } />
                                <Form.Check 
                                type="radio" 
                                label = '불가능'
                                name = 'pet'
                                value = 'false'
                                checked = {updaterItemInfo.petFriendly === false}
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({petFriendly: e.target.value === 'true' })
                                } />
                            </Form.Group>
                        </Card>
                        </div>
                        </div>
                        <Form.Group className='formControl'>
                            <Form.Label>전용 면적</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="제곱미터"
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({exclusiveArea: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>계약 면적</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="제곱미터"
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({contractArea: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>총 세대수</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="세대"
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({total_number_of_units: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>해당 면적 세대수</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="세대"
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({number_of_units_in_the_given_area: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>입주 가능 날짜</Form.Label>
                            <Form.Control
                                type="date"
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({ availableMoveInDate: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>추가 상세 정보</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Memo"
                                onChange={ 
                                    (e) => updateItemUpdaterInfo({memo: e.target.value })
                                }
                            />
                        </Form.Group>
                        <div className = "creatPageHasItem" style={{marginTop: '10px'}}>
                            <div className="text" style = {{marginBottom: '20px'}}>옵션 여부 (옵션인 경우 체크해주세요.)</div>   
                            <div style = {{display: 'flex', alignItems: 'center', marginBottom: '15px', fontSize: '15px'}}> 
                                <div className="creatPageText">침대</div>
                                <input type = "checkbox" checked = {bedExist} onChange = {onChangebedExist} />
 
                                <div className="creatPageText" style = {{marginLeft: '80px', marginRight: '25px'}}>침대 크기</div>
                                <input onChange={
                                    (e) => updateItemUpdaterInfo({ bedSize: e.target.value })
                                } className="set"  maxLength="6" disabled = {!bedExist} />
                            </div>
                            <div className = 'optionCheck'>
                            <div className="creatPageItem">
                                <div className="creatPageText">세탁기</div>
                                <input type = "checkbox" name = "hasWasher" checked = {hasItems.hasWasher} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">드라이기</div>
                                <input type = "checkbox" name = "hasDryer" checked = {hasItems.hasDryer} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">TV</div>
                                <input type = "checkbox" name = "hasTV" checked = {hasItems.hasTV} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">에어컨</div>
                                <input type = "checkbox" name = "hasAirConditioner" checked = {hasItems.hasAirConditioner} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">난방</div>
                                <input type = "checkbox" name = "hasHeater" checked = {hasItems.hasHeater} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">블라인드</div>
                                <input type = "checkbox" name = "hasBlinds" checked = {hasItems.hasBlinds} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">옷장</div>
                                <input type = "checkbox" name = "hasDresser" checked = {hasItems.hasDresser} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">전자레인지</div>
                                <input type = "checkbox" name = "hasMicrowave" checked = {hasItems.hasMicrowave} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">냉장고</div>
                                <input type = "checkbox" name = "hasFridge" checked = {hasItems.hasFridge} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">소파</div>
                                <input type = "checkbox" name = "hasSofa" checked = {hasItems.hasSofa} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">의자</div>
                                <input type = "checkbox" name = "hasChair" checked = {hasItems.hasChair} onChange = {onChangeCheckbox} />
                            </div>
                            </div>
                        </div>
                        <Button className = 'green' style = {{color: 'white', border: 'none', marginTop: '5px'}} type="submit" >
                            { isUpdateItemLoading? "Updating your Item":"변경"}
                        </Button>
                        {
                            updateItemError?.error && <Alert variant="danger">
                            <p>{updateItemError?.message}</p></Alert>
                        }
                        
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </div>
    </>);
};

export default ChangingItemData;