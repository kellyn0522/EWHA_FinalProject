import { Modal } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";

const AccountLinking = ({show ,handleClose}) => {
    const { user, accountUpdater } = useContext(AuthContext);
    const [input, setInput] = useState(null);

    const onLinking = async ()=>{
        console.log('계좌',input);

        await accountUpdater(input);
        //handleClose();
    };

    return( 
        <Modal show = {show} onHide={handleClose} style = {{minHeight: '50vh', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem'}}>
            <Modal.Header closeButton>
                <div className = "noto-sans-kr"> 계좌 연결</div>
            </Modal.Header>
            <Modal.Body className = "noto-sans-kr">
                <Form className = 'formControl'>
                    <Form.Label>계좌번호</Form.Label>
                    <Form.Control 
                        type="text" 
                        maxLength="6"
                        onChange={(e) => setInput(e.target.value)}
                        />
                    <Button className = 'green' style = {{color: 'white', border: 'none', width:'100px'}} onClick={onLinking} >
                        { user?.account? "연결 완료":"연결"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AccountLinking;