import { useEffect, useState } from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';
import styled from 'styled-components';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import FieldInput from "../components/FieldInput";
import MessageModal from "../components/MessageModal";
import { userContext } from "usercontext";

const Home: NextPage = () => {

  // const [fns, setFns] = useState<any>(null);
  const [recordDate, setRecordDate] = useState<Date | null>(null);
  const [field1, setfield1] = useState('');
  const [field2, setfield2] = useState('');
  const [field3, setfield3] = useState('');
  const [field4, setfield4] = useState('');
  const [field5, setfield5] = useState('');
  const [field6, setfield6] = useState('');
  const [field7, setfield7] = useState('');
  const [field8, setfield8] = useState('');
  const [field9, setfield9] = useState('');
  const [field10, setfield10] = useState('');
  const [field11, setfield11] = useState('');
  const [field12, setfield12] = useState('');
  const [field13, setfield13] = useState('');
  const [field14, setfield14] = useState('');
  const [field15, setfield15] = useState('');
  const [field16, setfield16] = useState('');
  const [field17, setfield17] = useState('');
  const [field18, setfield18] = useState('');
  const [field19, setfield19] = useState('');
  const [field20, setfield20] = useState('');
  const [dependent, setdependent] = useState('');

  const [monitor, setmonitor] = useState<any>(null);
  const [monitors, setmonitors] = useState([]);

  const [modalheader, setmodalheader] = useState('');
  const [modalmessage, setmodalmessage] = useState('');
  const [modalstate, setmodalstate] = useState(false);

  const openModal = (header: string, message: string, progress?: boolean) => {
    setmodalheader(header)
    setmodalmessage(message);
    setmodalstate(true);
  }

  const getFieldNames = () => {
    if(Object.keys(userContext.userValue).length==0) return;
    let user = JSON.parse(userContext.userValue.toString());
    const config = {
        headers: { 'Content-Type': 'application/json'},
    };

    const body = {
        email: Object.keys(user).length==0?"jai.singh3705@gmail.com":user.email,
    }; 

    axios.post("/api/getfieldnames", body, config).then((res:any) => {
        // console.log(`res ${JSON.stringify(res.data.fieldnames)}`);
        setmonitors(res.data.fieldnames);
    }).catch(error=> {
        console.log(error)
    })
  }

  useEffect(() => {
      getFieldNames();
      let dt = new Date();
      dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0)
      setRecordDate(dt);
  }, [])

  const clearFields = () => {
    setfield1('');
    setfield2('');
    setfield3('');
    setfield4('');
    setfield5('');
    setfield6('');
    setfield7('');
    setfield8('');
    setfield9('');
    setfield10('');
    setfield11('');
    setfield12('');
    setfield13('');
    setfield14('');
    setfield15('');
    setfield16('');
    setfield17('');
    setfield18('');
    setfield19('');
    setfield20('');
    setdependent('');
  }

  const saveData = () => {

    if(!monitor){
      openModal("Error", "Select monitor before saving data");
      return;
    }

    if(dependent==""){
      openModal("Error", "invalid inputs");
      return;
    }

    const config = {
      headers: { 'Content-Type': 'application/json'},
    };

    const body = {
        email: monitor?monitor.email: "",
        monitor: monitor?monitor.monitor: "",
        field1: field1,
        field2: field2,
        field3: field3,
        field4: field4,
        field5: field5,
        field6: field6,
        field7: field7,
        field8: field8,
        field9: field9,
        field10: field10,
        field11: field11,
        field12: field12,
        field13: field13,
        field14: field14,
        field15: field15,
        field16: field16,
        field17: field17,
        field18: field18,
        field19: field19,
        field20: field20,
        dependent: dependent,
        recordDate: recordDate,
    }
    axios.post("/api/savedailyactivitydata", body, config).then((res:any) => {
      console.log(`res ${JSON.stringify(res.data)}`);
      if(res.data.status==200){
        openModal("Message", "Data saved");
      }else{
        openModal("Error", "Failed to save data");
      }
      // clearFields();
      }).catch(error=> {
          console.log(error)
      })
  }

  const selectMonitor = (monitor: any) => {
    setmonitor(monitor);
  }

  const changeSelectedMonitor = (e: any) => {
    if(e.target.value==0){
      setmonitor(null);
      return;
    } 
    selectMonitor(monitors[e.target.value-1])
  }

  return (
    <MainContainer>
      <MessageModal header={modalheader} message={modalmessage} state={modalstate} handleClose={()=> setmodalstate(false)} />
        <Column>
      <Header>Daily activity logger</Header>
      <Row style={{margin:"10px 0", zIndex:1}}>
        <DatePicker
          dateFormat="MM/dd/yy"
          selected={recordDate}
          onChange={(date: Date | null) => setRecordDate(date)}
        />
      </Row>

      <Select onChange={changeSelectedMonitor}>
        <option value="0" key={`monitor0`}>--Select Monitor--</option>
        {
          monitors.map((val:any, idx) => (
            
          <option value={`${idx+1}`}  key={`monitor${idx+1}`}>{val.monitor}</option>                

          ))
        }
      </Select>

      <SubHeader>Enter daily data and save</SubHeader>

      {monitor?
        <Row>
          <FieldInput placeholder={monitor.dependent} value={dependent} change={setdependent}/>
        </Row>
        :<></>
      }
      {monitor?
      <Row>
        <Column>

          <FieldInput placeholder={monitor.field1Name} value={field1} change={setfield1} />
          <FieldInput placeholder={monitor.field2Name} value={field2} change={setfield2} />
          <FieldInput placeholder={monitor.field3Name} value={field3} change={setfield3} />
          <FieldInput placeholder={monitor.field4Name} value={field4} change={setfield4} />
          <FieldInput placeholder={monitor.field5Name} value={field5} change={setfield5} />
          <FieldInput placeholder={monitor.field6Name} value={field6} change={setfield6} />
          <FieldInput placeholder={monitor.field7Name} value={field7} change={setfield7} />
          <FieldInput placeholder={monitor.field8Name} value={field8} change={setfield8} />
          <FieldInput placeholder={monitor.field9Name} value={field9} change={setfield9} />
          <FieldInput placeholder={monitor.field10Name} value={field10} change={setfield10} />
        </Column>
        <Column>
          <FieldInput placeholder={`${monitor.field11Name}`} value={field11} change={setfield11} />
          <FieldInput placeholder={`${monitor.field12Name}`} value={field12} change={setfield12} />
          <FieldInput placeholder={`${monitor.field13Name}`} value={field13} change={setfield13} />
          <FieldInput placeholder={`${monitor.field14Name}`} value={field14} change={setfield14} />
          <FieldInput placeholder={`${monitor.field15Name}`} value={field15} change={setfield15} />
          <FieldInput placeholder={`${monitor.field16Name}`} value={field16} change={setfield16} />
          <FieldInput placeholder={`${monitor.field17Name}`} value={field17} change={setfield17} />
          <FieldInput placeholder={`${monitor.field18Name}`} value={field18} change={setfield18} />
          <FieldInput placeholder={`${monitor.field19Name}`} value={field19} change={setfield19} />
          <FieldInput placeholder={`${monitor.field20Name}`} value={field20} change={setfield20} />
        </Column>
        </Row>
        :<></>
        }

        <Button onClick={saveData}>Save</Button>
        </Column>
    </MainContainer>
);
};

const MainContainer = styled.div`
  display: flex;
  min-height: 85vh;
  color: #000000;
  flex-direction: column;
`

const Row = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`

const Column = styled.div`
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  color: #000000;
  @media (max-width: 770px) {
    padding: 20px 50px;
  }
`
const Header = styled.div`
  color: #000000;
  font-size: 30px;
  font-weight: 700;
`;

const SubHeader = styled.div`
  color: #000000;
  font-size: 18px;
  font-weight: 700;
`;

const Input = styled.input`
  padding: 10px;
  background-color: #eee;
  border: 1px solid black;
  margin: 10px;
  width: 250px;
  border-radius: 3px;
`

const Button = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
  padding: 10px;
  font-weight: 700;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #4d4dae;
  min-width: 75px;
  transition: ease 0.5s;
  &:hover {
    font-weight: 700;
    background-color: #212122;
  }
`
const Select = styled.select`
  padding: 10px;
  background-color: #eee;
  border: 1px solid black;
  margin: 10px;
  width: 250px;
  border-radius: 3px;
`;

export default Home
