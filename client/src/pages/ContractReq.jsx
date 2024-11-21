import { Modal, Card } from "react-bootstrap";
import { ReqContext } from "../context/ReqContext";
import {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";

const ContractReq = ({show ,handleClose}) => {
    const {getUserReceiveReq} = useContext(ReqContext);
    const [receiveRequest, setReceiveRequest] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReq = async () => {
            const allReqs = await getUserReceiveReq();
            if (Array.isArray(allReqs)){
                setReceiveRequest(allReqs);
            } else {
                console.error('Failed to fetch Request1111111.');
            }
        };
        fetchReq();
    }, []);

    useEffect(() => {
        console.log('Received Requwsts' ,receiveRequest );
    }, [receiveRequest]);

    const goToReq = (senderId, id) => {
        navigate(`/reqPage/${senderId}/${id}/${true}`);
    }
    
    return( 
        <Modal show = {show} onHide={handleClose} style = {{minHeight: '50vh', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem'}}>
            <Modal.Header closeButton>
                <div className = "noto-sans-kr"> 받은 거래 요청</div>
            </Modal.Header>
            <Modal.Body className = "noto-sans-kr">
                <div>
                {receiveRequest?.map((r) => (
                    <Card  style = {{display: 'flex', justifyContent: 'center', padding: '1rem', gap: '7px'}} onClick = {() => goToReq(r.senderId, r._id)}>
                        <strong>ID: {r.senderId} 님이 거래 요청을 하였습니다.</strong>
                        <p style={{marginBottom: '0'}}>거래 요청 한 매물: {r.itemId}</p>
                    </Card>
                ))}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ContractReq;