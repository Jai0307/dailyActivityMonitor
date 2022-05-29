import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import MessageModal from "../components/MessageModal";
import { userContext } from "usercontext";

const Settings: NextPage = (props) => {

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

    const [newmonitor, setnewmonitor] = useState('');
    const [monitors, setmonitors] = useState([]);
    const [monitor, setmonitor] = useState<any>(null);

    const [fieldNames, setFieldNames] = useState<any>(null);

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
    }, [userContext, userContext.userValue])

    useEffect(() => {
    }, [monitors])

    const saveSettings = () => {
      if(!monitor){
        openModal("Error", "Select monitor before saving");
        return;
      }
      if(dependent==""){
        openModal("Error", "dependent variable name cannot be blank");
        return;
      }

      const config = {
          headers: { 'Content-Type': 'application/json'},
      };

      const body = {
          email: monitor?monitor.email:"",
          monitor: monitor?monitor.monitor:"",
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
      }

      axios.post("/api/savefieldnames", body, config).then((res) => {
          // console.log(`res ${JSON.stringify(res)}`);
          if(res.data.status==200){
            getFieldNames();
            openModal("Message", res.data.msg)
          }else{
              openModal("Error", res.data.msg)
          }
      }).catch(error=> {
          console.log(error)
      })

    }

    const createMonitor = () => {
      if(newmonitor==""){
        openModal("Error", "Monitor name cannot be empty");
        return;
      }
      let user = JSON.parse(userContext.userValue.toString());
      const config = {
        headers: { 'Content-Type': 'application/json'},
      };

      const body = {
          email: Object.keys(user).length==0?"jai.singh3705@gmail.com":user.email,
          monitor: newmonitor
      }
      axios.post("/api/createmonitor", body, config).then((res) => {
        // console.log(`res ${JSON.stringify(res)}`);
        if(res.data.status==200){
            openModal("Message", res.data.msg)
            setnewmonitor('');
            getFieldNames();
        }else{
            openModal("Error", res.data.msg)
        }
      }).catch(error=> {
          console.log(error)
          openModal("Error", error.message)
      })
    }

    const selectMonitor = (monitor: any) => {

      setmonitor(monitor);

      setfield1(monitor.field1Name);
      setfield2(monitor.field2Name); 
      setfield3(monitor.field3Name);
      setfield4(monitor.field4Name);
      setfield5(monitor.field5Name);
      setfield6(monitor.field6Name);
      setfield7(monitor.field7Name);
      setfield8(monitor.field8Name);
      setfield9(monitor.field9Name);
      setfield10(monitor.field10Name);
      setfield11(monitor.field11Name);
      setfield12(monitor.field12Name);
      setfield13(monitor.field13Name);
      setfield14(monitor.field14Name);
      setfield15(monitor.field15Name);
      setfield16(monitor.field16Name);
      setfield17(monitor.field17Name);
      setfield18(monitor.field18Name);
      setfield19(monitor.field19Name);
      setfield20(monitor.field20Name);
      setdependent(monitor.dependent);
    }

    const changeSelectedMonitor = (e: any) => {
      if(e.target.value==0){
        setmonitor(null);
        return;
      } 
      selectMonitor(monitors[e.target.value-1])
    }

  return (
    <>
      <MainContainer>
          <MessageModal header={modalheader} message={modalmessage} state={modalstate} handleClose={()=> setmodalstate(false)} />
          <Column>
          <Header style={{alignSelf:"center"}}>Settings</Header>
          <Extra style={{alignSelf:"center"}}>(Save field names)</Extra>

          <Input placeholder='Enter monitor name' value={newmonitor} onChange={(e) => setnewmonitor(e.target.value)}/>
          <SmallButton onClick={createMonitor}>Create Monitor</SmallButton>

          <Select onChange={changeSelectedMonitor}>
            <option value="0" key={`monitor0`}>--Select Monitor--</option>
            {
              monitors.map((val:any, idx) => (
               
              <option value={`${idx+1}`}  key={`monitor${idx+1}`}>{val.monitor}</option>                

              ))
            }
          </Select>

          <br />
          <SubHeader style={{alignSelf:"center"}}>Field Names</SubHeader>
          <SmallButton onClick={saveSettings}>Save</SmallButton>
          </Column>
          <Row>
              <Column>
                  <Input placeholder='field1' value={field1} onChange={(e) => setfield1(e.target.value)}/>
                  <Input placeholder='field2' value={field2} onChange={(e) => setfield2(e.target.value)}/>
                  <Input placeholder='field3' value={field3} onChange={(e) => setfield3(e.target.value)}/>
                  <Input placeholder='field4' value={field4} onChange={(e) => setfield4(e.target.value)}/>
                  <Input placeholder='field5' value={field5} onChange={(e) => setfield5(e.target.value)}/>
                  <Input placeholder='field6' value={field6} onChange={(e) => setfield6(e.target.value)}/>
                  <Input placeholder='field7' value={field7} onChange={(e) => setfield7(e.target.value)}/>
                  <Input placeholder='field8' value={field8} onChange={(e) => setfield8(e.target.value)}/>
                  <Input placeholder='field9' value={field9} onChange={(e) => setfield9(e.target.value)}/>
                  <Input placeholder='field10' value={field10} onChange={(e) => setfield10(e.target.value)}/>
                  <Input placeholder='field11' value={field11} onChange={(e) => setfield11(e.target.value)}/>
                  </Column>
                  <Column>
                  <Input placeholder='field12' value={field12} onChange={(e) => setfield12(e.target.value)}/>
                  <Input placeholder='field13' value={field13} onChange={(e) => setfield13(e.target.value)}/>
                  <Input placeholder='field14' value={field14} onChange={(e) => setfield14(e.target.value)}/>
                  <Input placeholder='field15' value={field15} onChange={(e) => setfield15(e.target.value)}/>
                  <Input placeholder='field16' value={field16} onChange={(e) => setfield16(e.target.value)}/>
                  <Input placeholder='field17' value={field17} onChange={(e) => setfield17(e.target.value)}/>
                  <Input placeholder='field18' value={field18} onChange={(e) => setfield18(e.target.value)}/>
                  <Input placeholder='field19' value={field19} onChange={(e) => setfield19(e.target.value)}/>
                  <Input placeholder='field20' value={field20} onChange={(e) => setfield20(e.target.value)}/>
                  
                  </Column>
                  <Column>

                  <SubHeader style={{alignSelf:"center"}}>Dependent Variable</SubHeader>
                  
                  <Input placeholder='dependent' value={dependent} onChange={(e) => setdependent(e.target.value)}/>


              </Column>
              <Column>
              </Column>
          </Row>
        </MainContainer>
    </>
  );
};

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 85vh;
  justify-content: center;
  align-items: center;
  color: #000000;
  @media (max-width: 770px) {
    flex-direction: column;
  }
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 5px;
`

export const Column = styled.div`
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  color: #000000;
  @media (max-width: 770px) {
    padding: 20px 50px;
  }
`

const Header = styled.div`
    padding: 10px;
    font-weight: 700;
    font-size: 40px;
`;

const SubHeader = styled.div`
    font-weight: 700;
    font-size: 25px;
`;

const Extra = styled.div`
    font-weight: 700;
    font-size: 14px;
`;

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

const SmallButton = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  text-transform: uppercase;
  padding: 7px;
  font-weight: 500;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #4d4dae;
  min-width: 50px;
  transition: ease 0.5s;
  &:hover {
    font-weight: 700;
    background-color: #212122;
  }
`
const ButtonDiv = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  background-color: #eee;
  border: 1px solid black;
  margin: 10px;
  width: 250px;
  border-radius: 3px;
`

const Select = styled.select`
  padding: 10px;
  background-color: #eee;
  border: 1px solid black;
  margin: 10px;
  width: 250px;
  border-radius: 3px;
`;

export default Settings;
