import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components';
import LineChart from 'components/LineChartComp';
import { useEffect, useState } from 'react';
import { userContext } from 'usercontext';
import axios from 'axios';
import { formatDateStr } from 'utils/helperfunctions'
import LineChartComp from 'components/LineChartComp';

const Home: NextPage = () => {

  const [monitor, setmonitor] = useState<any>(null);
  const [monitors, setmonitors] = useState<any>([]);
  const [selectedmonitoridx, setselectedmonitoridx] = useState(-1);
  const [fielddata, setfielddata] = useState([{}])
  const [dataavailable, setdataavailable] = useState(false);

  // const data = [
  //   {date: 1, data: 24,},
  //   {date: 2, data: 22,},
  //   {date: 3, data: 22,},
  //   {date: 4, data: 20,},
  //   {date: 5, data: 21,},
  //   {date: 6, data: 25,},
  //   {date: 7, data: 21,},
  // ];

  const data = [{}]

  const getMonitorData = (idx: any) => {
    if(Object.keys(userContext.userValue).length==0) return;

    let user = JSON.parse(userContext.userValue.toString());
    const config = {
        headers: { 'Content-Type': 'application/json'},
    };

    const body = {
        email: Object.keys(user).length==0?"jai.singh3705@gmail.com":user.email,
        monitor: monitor.monitor,
        fieldidx: idx+1,
    }; 

    axios.post("/api/getdailyactivitydata", body, config).then((res:any) => {
        // console.log(`res ${JSON.stringify(res.data.data[0].length)}`);
        let data = [];
        // let data1 = [];
        if(res.data.status==200){
          for(let i=0; i<res.data.data.length; i++){
            // data1.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].dependentValue})
            switch(idx+1){
              case 1:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field1Value});
                break;
              case 2:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field2Value});
                break;
              case 3:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field3Value});
                break;
              case 4:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field4Value});
                break;
              case 5:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field5Value});
                break;
              case 6:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field6Value});
                break;
              case 7:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field7Value});
                break;
              case 8:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field8Value});
                break;
              case 9:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field9Value});
                break;
              case 10:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field10Value});
                break;
              case 11:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field11Value});
                break;
              case 12:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field12Value});
                break;
              case 13:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field13Value});
                break;
              case 14:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field14Value});
                break;
              case 15:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field15Value});
                break;
              case 16:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field16Value});
                break;
              case 17:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field17Value});
                break;
              case 18:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field18Value});
                break;
              case 19:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field19Value});
                break;
              case 20:
                data.push({date: formatDateStr(res.data.data[i].recordDate, "M/d/y"), dependent: res.data.data[i].dependentValue, data: res.data.data[i].field20Value});
                break;
              default:
                break;
            }
          }
          setfielddata(data);
          setdataavailable(true);
        }else{
          setfielddata([{}])
        }
    }).catch(error=> {
        console.log(error)
    })
  }

  const getMonitors = async () => {
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

  const changeSelectedField = (e: any) => {
    if(e.target.value==0){
      setfielddata([{}]);
      setdataavailable(false);
      return;
    }
    getMonitorData(e.target.value-1);
  }

  const changeSelectedMonitor = (e: any) => {
    if(e.target.value==0){
      setmonitor(null);
      return;
    }
    // console.log(`selectedidx ${e.target.value-1}`);
    setselectedmonitoridx(e.target.value-1)
    setmonitor(monitors[e.target.value-1]);
  }

  useEffect( () => {
    getMonitors();
  }, [])

  return (
    <MainContainer>
      <Column>
        <Header>Analyze Data</Header>

        <Row>

        <Select onChange={changeSelectedMonitor}>
          <option value="0" key={`monitor0`}>--Select Monitor--</option>
          {
            monitors.map((val:any, idx: any) => (
              
            <option value={`${idx+1}`}  key={`monitor${idx+1}`}>{val.monitor}</option>                

            ))
          }
        </Select>

        <Select onChange={changeSelectedField}>
          <option value="0" key={`monitorfield0`}>--Select Field--</option>
          {
            selectedmonitoridx>-1 && monitor && (
              <>
                <option value={`${1}`}  key={`monitorfield${1}`}>{monitor.field1Name}</option>
                <option value={`${2}`}  key={`monitorfield${2}`}>{monitor.field2Name}</option>
                <option value={`${3}`}  key={`monitorfield${3}`}>{monitor.field3Name}</option>
                <option value={`${4}`}  key={`monitorfield${4}`}>{monitor.field4Name}</option>
                <option value={`${5}`}  key={`monitorfield${5}`}>{monitor.field5Name}</option>
                <option value={`${6}`}  key={`monitorfield${6}`}>{monitor.field6Name}</option>
                <option value={`${7}`}  key={`monitorfield${7}`}>{monitor.field7Name}</option>
                <option value={`${8}`}  key={`monitorfield${8}`}>{monitor.field8Name}</option>
                <option value={`${9}`}  key={`monitorfield${9}`}>{monitor.field9Name}</option>
                <option value={`${10}`}  key={`monitorfield${10}`}>{monitor.field10Name}</option>
                <option value={`${11}`}  key={`monitorfield${11}`}>{monitor.field11Name}</option>
                <option value={`${12}`}  key={`monitorfield${12}`}>{monitor.field12Name}</option>
                <option value={`${13}`}  key={`monitorfield${13}`}>{monitor.field13Name}</option>
                <option value={`${14}`}  key={`monitorfield${14}`}>{monitor.field14Name}</option>
                <option value={`${15}`}  key={`monitorfield${15}`}>{monitor.field15Name}</option>
                <option value={`${16}`}  key={`monitorfield${16}`}>{monitor.field16Name}</option>
                <option value={`${17}`}  key={`monitorfield${17}`}>{monitor.field17Name}</option>
                <option value={`${18}`}  key={`monitorfield${18}`}>{monitor.field18Name}</option>
                <option value={`${19}`}  key={`monitorfield${19}`}>{monitor.field19Name}</option>
                <option value={`${20}`}  key={`monitorfield${20}`}>{monitor.field20Name}</option>
              </>
            )
          }
        </Select>

        </Row>
        <br />
        <br />
        {dataavailable?
        <>
          <LineChartComp data={fielddata} width={500} height={300} color={"#006400"} />
          <Title>{monitor?monitor.monitor:""}</Title>
        </>:
        <></>
        }

        {/* <Button>Start</Button> */}
      </Column>
    </MainContainer>
);
};

const MainContainer = styled.div`
display: flex;
min-height: 85vh;
color: #000000;
@media (max-width: 770px) {
flex-direction: column;
}
`

const Row = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`

const Column = styled.div`
padding: 50px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex: 1;
color: #000000;
@media (max-width: 770px) {
padding: 20px 50px;
}
`
const Header = styled.h3`
color: #000000;
`;

const Title = styled.h3`
  color: #000000;
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
