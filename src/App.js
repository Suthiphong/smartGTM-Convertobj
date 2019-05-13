import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button,Badge,Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Select from 'react-select';

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];




const newObj = (newData) =>{
  //console.log(JSON.parse(newData))
  
  newData = JSON.parse(newData)

  let nodeDataArray = newData.nodeDataArray.map((item)=>{
    //let zOrder = (item.source != '../img/symbol/original/116.png') ? 20 : 2
    let DataSource = (item.source != '../img/symbol/original/116.png') ? "3" : "1"
    let datafield = (item.source != '../img/symbol/original/116.png') ? "STATUS_STATE" : "CUR_VALUE"
    if(item.category == 'valve' || item.source == '../img/symbol/original/62.png')
      return { 
          ...item,
          DataSource,
          datafield
      }
    if(item.category == 'static_text' || item.category == 'text_nomodel' || item.category == 'HyperLink')
    {
      let format = '###0.0000 U'
      return {
        ...item,
        format,
      }
    }
    else{
      return {
        ...item
      }
    }
   
    })
    return {
      ...newData,
      nodeDataArray
    }
   
    

}

const newThinkness = (Obj,thik) => {
  Obj = JSON.parse(Obj)
  let linkDataArray = Obj.linkDataArray.map( item =>{
  let Thikness = thik.value.toString()
  let scale = (parseInt(Thikness) < 4) ? 1 : 2
  return {
    ...item,
    Thikness,
    scale
  }
  })
  return {
    ...Obj,
    linkDataArray,
   
  }
}


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      jsonOld : null,
      jsonNew: null,
      copied: false,
      thinkness: false,
      selectedOption: null,
      value: '',
    }
  }

  textAreaHandle = (even) => {
    this.setState({
      jsonOld: even.target.value,
      value: even.target.value,
      copied: false
    })
  }
  ConvertHandle = () => {
   //console.log(newObj(this.state.jsonOld))
   let NewData = newObj(this.state.jsonOld)
   this.setState({
     jsonNew: NewData
   })
  }
 
  ThinknessConvert = () => {
    let newData = newThinkness(this.state.jsonOld, this.state.selectedOption)
    this.setState({
      jsonNew: newData
    })

  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    
  }

  /*let NewObj = (newData) => {
    let nodeDataArray = newData.nodeDataArray.map((item)=>{
        let zOrder = 20
        return {
            ...item,
            zOrder
        }
    })
    return{
        ...newData,
        nodeDataArray
    }
}*/
 ClearAllData = () => {
   this.setState({
    jsonNew: '',
    jsonOld: '',
    value: ''

   })
 }
  render(){
    const { selectedOption } = this.state;
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{width:100, height:100, position: 'absolute'}}/><label style={{position:'absolute', fontSize:13,top:70,left:50}}><Badge color="secondary">ReactJS JINGJO</Badge></label>
        <h1>SmartGTM Convert OBJECT JSON</h1>
        <div className="display_code" style={{paddingLeft:50,paddingRight:50, paddingTop: 50, paddingBottom: 0,display: 'flex',flexDirection: 'row'}}>
          <div style={{flex:1,margin:5}}>
            <p style={{fontSize:20,margin:5}}>OBJECT INPUT</p>
            <textarea value={this.state.value} onChange={this.textAreaHandle} placeholder={"Example"+ JSON.stringify(data)}style={{borderRadius: 10,backgroundColor: '#282c34',color: '#fff',fontSize:10,flex:1, width: '100%',padding:10, height:500,overflow: 'hidden'}}>
            </textarea>
          </div>
          <div style={{flex:1,margin:5}}>
          <p style={{fontSize:20,margin:5}}>OBJECT OUTPUT</p>
            <textarea placeholder="ss" value={JSON.stringify(this.state.jsonNew)}style={{borderRadius: 10,backgroundColor: '#282c34',color: '#fff',fontSize:10,flex:1, width: '100%',padding:10, height:500,overflow: 'hidden'}}>

            </textarea>

          </div>
          
        </div>
        <div style={{textAlign: 'center', margin:0}}>
        <div style={{borderStyle: 'solid', borderRadius: 10, width:500,margin: 'auto', borderWidth: 1,height:50, display:'block'}}>
          
          <input type="checkbox"  onChange={()=> this.setState({thinkness: !this.state.thinkness})}/><label style={{fontSize:18, padding: 10}}>Thinkness</label>
          <div style={{width:100,height: 100, fontSize:10,color: '#000'}}>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
            
          />
            </div>
        </div>
        
        <Button color="primary" style={{margin:5}} outline onClick={this.ClearAllData}>Clear</Button>
        <Button color={(this.state.jsonNew) ? "success" : "primary"} style={{margin:5}} onClick={(this.state.thinkness) ? this.ThinknessConvert : this.ConvertHandle}>{(this.state.jsonNew) ? "Success" : "Covert"}</Button>
        <CopyToClipboard text={JSON.stringify(this.state.jsonNew)}
          onCopy={() => this.setState({copied: true})}>
          <Button color="info">{this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : "CopyJson"}</Button>
        </CopyToClipboard>
        </div>
        
      </header>
    </div>
  );
}
}

export default App;


const data = { "class": "GraphLinksModel",
"copiesKey": false,
"linkFromPortIdProperty": "fromPort",
"linkToPortIdProperty": "toPort",
"nodeDataArray": [ 
{"category":"RectanStroke", "key":"rts222", "width":506, "height":50, "text":"BV4.08 STATION <AREA 4900>", "textcolor":"white", "fill":"transparent", "stroke":"#00ffff", "strokeWidth":2, "Tag":"", "loc":"-194.09000000000015 -536.6771441249999", "textAlign":"center", "font":"32px sans-serif"},
{"category":"Rectan", "key":"rectan", "width":150, "height":50, "text":"BV 4.07", "fill":"grey", "stroke":"#0000ff", "Tag":"", "loc":"-824.7113479062516 150.37110542187474", "font":"16px sans-serif"},
{"Tag":"D4900-ZLO-308", "category":"static", "key":"s35423", "source":"../img/symbol/original/62.png", "image":"62.png", "width":18, "height":18, "loc":"187.6406681955881 -337.45810248089737", "DataSource":"3", "datafield":"STATUS_STATE"},
{"category":"RectanStroke", "key":"rts272", "width":253, "height":61, "text":"", "textcolor":"white", "fill":"transparent", "stroke":"white", "strokeWidth":2, "Tag":"", "loc":"-737.3976639199178 -521.7054069357899"},
{"category":"static_text", "key":"capt62", "width":247, "height":20, "text":"Line Break Setpoint", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"center", "loc":"-738.3976639199177 -535.2054069357903"},
{"category":"RectanStroke", "key":"rts2722", "width":253, "height":1, "text":"", "textcolor":"white", "fill":"transparent", "stroke":"white", "strokeWidth":1, "Tag":"", "loc":"-737.3976639199178 -520.7054069357899"},
{"category":"RectanStroke", "key":"rts27222", "width":29, "height":1, "text":"", "textcolor":"white", "fill":"transparent", "stroke":"white", "strokeWidth":1, "Tag":"", "loc":"-777.3976639199178 -506.70540693578994", "angle":90},
{"category":"static_text", "key":"capt622", "width":85, "height":20, "text":"HOV-008", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-814.3976639199177 -505.2054069357903"},
{"category":"static_text", "key":"capt6222", "width":153, "height":20, "text":"LB = 35 psi/min", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-695.3976639199177 -505.2054069357903"},
{"category":"Rectan", "key":"rectan22", "width":135, "height":42, "text":"OVERVIEW", "fill":"grey", "stroke":"#0000ff", "Tag":"", "loc":"221.25764732812524 -531.2462937656259", "font":"16px sans-serif"},
{"category":"Rectan", "key":"rectan222", "width":135, "height":42, "text":"FGS", "fill":"grey", "stroke":"#0000ff", "Tag":"", "loc":"364.25764732812524 -531.2462937656259", "font":"16px sans-serif"},
{"category":"Rectan", "key":"rectan2222", "width":135, "height":42, "text":"MODULE", "fill":"grey", "stroke":"#0000ff", "Tag":"", "loc":"506.25764732812524 -531.2462937656259", "font":"16px sans-serif"},
{"Tag":"D4900-HOV-008", "category":"valve", "key":"s1102", "source":"../img/symbol/original/113.png", "image":"113.png", "width":50, "height":68, "loc":"-547.0900000000001 132.94986209374986", "DataSource":"3", "datafield":"STATUS_STATE", "text":"D4900-HOV-008"},
{"category":"Rectan", "key":"rectan2", "width":150, "height":50, "text":"BV 4.09", "fill":"grey", "stroke":"#0000ff", "Tag":"", "loc":"-136.7113479062516 150.37110542187474", "font":"16px sans-serif"},
{"category":"RectanStroke", "key":"rts2732", "width":150, "height":50, "text":"", "textcolor":"white", "fill":"transparent", "stroke":"white", "strokeWidth":2, "Tag":"", "loc":"-826.0900000000001 70.27909634615594"},
{"category":"text_nomodel", "key":"captno832", "width":120, "height":20, "text":"A4900-PI-008", "stroke":"white", "font":"18px sans-serif", "Tag":"A4900-PI-008", "textAlign":"left", "format":"#,##0.0 U", "loc":"-837.0900000000001 84.279096346156", "DataSource":"1", "datafield":"CUR_VALUE"},
{"category":"static_text", "key":"capt642", "width":106, "height":17, "text":"PI-008", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-844.0900000000001 57.77909634615594"},
{"Tag":"", "category":"valve", "key":"s127232", "source":"../img/symbol/original/130.png", "image":"130.png", "width":50, "height":35, "loc":"-688.217132730068 -14.711347736014147", "angle":270},
{"category":"static_text", "key":"capt6422", "width":106, "height":17, "text":"XA 008", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-615.0900000000001 57.77909634615594"},
{"category":"RectanStroke", "key":"rts27322", "width":117, "height":50, "text":"", "textcolor":"white", "fill":"transparent", "stroke":"white", "strokeWidth":2, "Tag":"", "loc":"-613.7152115999534 70.27909634615594"},
{"category":"text_nomodel", "key":"captno8322", "width":120, "height":20, "text":"D4900-XA-008", "stroke":"white", "font":"18px sans-serif", "Tag":"D4900-XA-008", "textAlign":"left", "format":"", "loc":"-609.0900000000001 84.279096346156", "DataSource":"3", "datafield":"STATUS_STATE"},
{"category":"static_text", "key":"capt64222", "width":106, "height":17, "text":"PAL 008", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-493.09000000000015 57.77909634615594"},
{"category":"static_text", "key":"capt642222", "width":106, "height":17, "text":"LBA 008", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-559.0900000000001 2.7790963461559386"},
{"category":"RectanStroke", "key":"rts2732222", "width":117, "height":50, "text":"", "textcolor":"white", "fill":"transparent", "stroke":"white", "strokeWidth":2, "Tag":"", "loc":"-557.7152115999534 15.279096346155939"},
{"category":"text_nomodel", "key":"captno832222", "width":120, "height":20, "text":"D4900-LBA-008", "stroke":"white", "font":"18px sans-serif", "Tag":"D4900-LBA-008", "textAlign":"left", "format":"", "loc":"-553.0900000000001 29.279096346155995", "DataSource":"3", "datafield":"STATUS_STATE"},
{"Tag":"", "category":"valve", "key":"s152", "source":"../img/symbol/original/155.png", "image":"155.png", "width":50, "height":49, "loc":"-553.8199437499995 -112.94746250000026"},
{"Tag":"", "category":"valve", "key":"s1272322", "source":"../img/symbol/original/130.png", "image":"130.png", "width":50, "height":35, "loc":"-403.217132730068 -14.711347736014147", "angle":270},
{"Tag":"", "category":"static", "key":"s174", "source":"../img/symbol/original/177.png", "image":"177.png", "width":20, "height":37, "loc":"-346.5357952704891 -99.97527264874236"},
{"Tag":"", "category":"valve", "key":"s127522", "source":"../img/symbol/original/130.png", "image":"130.png", "width":50, "height":35, "loc":"-244.56112499999642 -100.07820061738664"},
{"Tag":"", "category":"valve", "key":"s1275222", "source":"../img/symbol/original/130.png", "image":"130.png", "width":50, "height":35, "loc":"-244.56112499999642 -174.07820061738664"},
{"Tag":"", "category":"static", "key":"s175", "source":"../img/symbol/original/178.png", "image":"178.png", "width":22, "height":33, "loc":"-181.35855872256445 -175.30249227437122"},
{"Tag":"", "category":"static", "key":"s1752", "source":"../img/symbol/original/178.png", "image":"178.png", "width":22, "height":33, "loc":"-181.35855872256445 -99.30249227437122"},
{"Tag":"", "category":"static", "key":"s1742", "source":"../img/symbol/original/177.png", "image":"177.png", "width":20, "height":37, "loc":"-137.53579527048907 -99.97527264874236"},
{"Tag":"", "category":"static", "key":"s17422", "source":"../img/symbol/original/177.png", "image":"177.png", "width":20, "height":37, "loc":"-137.53579527048907 -174.97527264874236"},
{"category":"static_text", "key":"capt623", "width":247, "height":20, "text":"BLOW DOWN STACK", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"center", "loc":"-50.397663919917704 -350.2054069357903"},
{"category":"static_text", "key":"capt624", "width":77, "height":20, "text":"HV119", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-726.3976639199177 -13.205406935790279"},
{"category":"static_text", "key":"capt6242", "width":77, "height":20, "text":"24\"", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-629.3976639199177 -13.205406935790279"},
{"category":"static_text", "key":"capt62422", "width":77, "height":20, "text":"24\"", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-526.3976639199177 -147.20540693579028"},
{"category":"static_text", "key":"capt6243", "width":77, "height":20, "text":"HV163", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-543.3976639199177 -73.20540693579028"},
{"category":"static_text", "key":"capt624222", "width":77, "height":20, "text":"24\"", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-409.3976639199177 -11.205406935790279"},
{"category":"static_text", "key":"capt6244", "width":77, "height":20, "text":"HV121", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-341.3976639199177 -13.205406935790279"},
{"category":"static_text", "key":"capt62442", "width":77, "height":20, "text":"24\"X18\"", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-343.3976639199177 -66.20540693579028"},
{"category":"static_text", "key":"capt62443", "width":77, "height":20, "text":"HV125", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-232.3976639199177 -66.20540693579028"},
{"category":"static_text", "key":"capt624432", "width":77, "height":20, "text":"18\"X24\"", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-125.3976639199177 -66.20540693579028"},
{"category":"static_text", "key":"capt62423", "width":77, "height":20, "text":"18\"", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-216.3976639199177 -125.20540693579028"},
{"category":"static_text", "key":"capt624232", "width":77, "height":20, "text":"12\"", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-216.3976639199177 -197.20540693579028"},
{"category":"static_text", "key":"capt6244322", "width":77, "height":20, "text":"12\"X16\"", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-123.3976639199177 -202.20540693579028"},
{"Tag":"D4900-YA-008", "category":"static", "key":"s3542312", "source":"../img/symbol/original/62.png", "image":"62.png", "width":18, "height":18, "loc":"187.6406681955881 -312.45810248089737", "DataSource":"3", "datafield":"STATUS_STATE"},
{"Tag":"D4900-FGS-008", "category":"static", "key":"s3542313", "source":"../img/symbol/original/62.png", "image":"62.png", "width":18, "height":18, "loc":"187.6406681955881 -287.45810248089737", "DataSource":"3", "datafield":"STATUS_STATE"},
{"Tag":"D4900-EAL-008", "category":"static", "key":"s35423122", "source":"../img/symbol/original/62.png", "image":"62.png", "width":18, "height":18, "loc":"187.6406681955881 -262.45810248089737", "DataSource":"3", "datafield":"STATUS_STATE"},
{"Tag":"D4900-JAL-008", "category":"static", "key":"s3542314", "source":"../img/symbol/original/62.png", "image":"62.png", "width":18, "height":18, "loc":"187.6406681955881 -237.45810248089737", "DataSource":"3", "datafield":"STATUS_STATE"},
{"Tag":"D4900-ZLO-108", "category":"static", "key":"s35423123", "source":"../img/symbol/original/62.png", "image":"62.png", "width":18, "height":18, "loc":"187.6406681955881 -212.45810248089737", "DataSource":"3", "datafield":"STATUS_STATE"},
{"Tag":"D4900-XI-086", "category":"static", "key":"s35423132", "source":"../img/symbol/original/62.png", "image":"62.png", "width":18, "height":18, "loc":"187.6406681955881 -187.45810248089737", "DataSource":"3", "datafield":"STATUS_STATE", "format":""},
{"Tag":"SD4900-SS-308", "category":"static", "key":"s354231222", "source":"../img/symbol/original/62.png", "image":"62.png", "width":18, "height":18, "loc":"187.6406681955881 -137.45810248089737", "DataSource":"3", "datafield":"STATUS_STATE"},
{"Tag":"D4900-XA-108", "category":"static", "key":"s3542312222", "source":"../img/symbol/original/62.png", "image":"62.png", "width":18, "height":18, "loc":"187.6406681955881 -37.45810248089737", "DataSource":"3", "datafield":"STATUS_STATE"},
{"Tag":"D4900-XA-087", "category":"static", "key":"s354231322", "source":"../img/symbol/original/62.png", "image":"62.png", "width":18, "height":18, "loc":"187.6406681955881 -112.45810248089737", "DataSource":"3", "datafield":"STATUS_STATE"},
{"category":"static_text", "key":"capt24", "width":300, "height":20, "text":"CONTROL ROOM DOOR STATUS", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"373.97958977085705 -335.66169723000075", "datafield":"", "DataSource":"3"},
{"category":"static_text", "key":"capt242", "width":300, "height":20, "text":"ROBBER PLEASE HELP", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"373.97958977085705 -310.66169723000075"},
{"category":"static_text", "key":"capt243", "width":300, "height":20, "text":"FGS COMMON ALARM", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"373.97958977085705 -285.66169723000075"},
{"category":"static_text", "key":"capt2422", "width":335, "height":20, "text":"BATTERYCHARGER MALFUNCTION", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"391.47958977085705 -260.66169723000075"},
{"category":"static_text", "key":"capt244", "width":300, "height":20, "text":"AC POWER FAILURE", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"373.97958977085705 -236.66169723000075"},
{"category":"static_text", "key":"capt2423", "width":300, "height":20, "text":"RTU CABINET DOOR STATUS", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"373.97958977085705 -211.66169723000075"},
{"category":"static_text", "key":"capt2432", "width":300, "height":20, "text":"CP CURENT INTERRUPTER", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"373.97958977085705 -186.66169723000075"},
{"category":"static_text", "key":"capt24222", "width":324, "height":20, "text":"MANUAL CALL POINT IN CONTROL", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"385.97958977085705 -136.66169723000075"},
{"category":"static_text", "key":"capt242222", "width":300, "height":20, "text":"FUSE AND CONTAFCT CHECKER", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"398.97958977085705 -86.66169723000075"},
{"category":"static_text", "key":"capt24322", "width":349, "height":20, "text":"COMMAND CURRENT INTERRUPTER", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"398.47958977085705 -111.66169723000075"},
{"category":"static_text", "key":"capt2422222", "width":300, "height":20, "text":"RTU TEST FACC", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"398.97958977085705 -62.661697230000755"},
{"category":"static_text", "key":"capt24222222", "width":300, "height":20, "text":"RTU TEST DI/DO", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"373.97958977085705 -37.661697230000755"},
{"category":"Rectan", "key":"rectan23", "width":69, "height":22, "text":"PUSH", "fill":"grey", "stroke":"#00ff40", "Tag":"", "loc":"209.7886520937484 -62.46889457812526", "font":"16px sans-serif"},
{"category":"static_text", "key":"capt6223", "width":85, "height":20, "text":"D4900-FACC_I-008", "stroke":"white", "font":"18px sans-serif", "Tag":"D4900-FACC_I-008", "textAlign":"left", "loc":"216.6023360800823 -86.20540693579028", "DataSource":"3", "datafield":"STATUS_STATE"},
{"category":"RectanStroke", "key":"rts24222", "width":415, "height":4, "text":"", "textcolor":"white", "fill":"transparent", "stroke":"white", "strokeWidth":2, "Tag":"", "loc":"368.5695897708458 -4.373494282158845", "borderColor":"#bcbcbc"},
{"category":"static_text", "key":"capt6232", "width":247, "height":20, "text":"ALARM", "stroke":"white", "font":"26px sans-serif", "Tag":"", "textAlign":"center", "loc":"359.6023360800823 13.794593064209721"},
{"category":"static_text", "key":"capt245", "width":300, "height":20, "text":"BATTERY VOLTAGE", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"323.97958977085705 63.338302769999245"},
{"category":"static_text", "key":"capt2424", "width":300, "height":20, "text":"P/S POTENTIAL", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"323.97958977085705 88.33830276999925"},
{"category":"static_text", "key":"capt2433", "width":300, "height":20, "text":"CP RECTIFIER VOLTAGE", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"323.97958977085705 113.33830276999925"},
{"category":"static_text", "key":"capt24223", "width":335, "height":20, "text":"CP RECTIFIER CURRENT", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"341.47958977085705 138.33830276999925"},
{"category":"static_text", "key":"capt2442", "width":300, "height":20, "text":"AC INPUT VOLTAGE", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"323.97958977085705 162.33830276999925"},
{"category":"static_text", "key":"capt24232", "width":300, "height":20, "text":"CONTROL ROOM TEMP .", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"323.97958977085705 187.33830276999925"},
{"category":"static_text", "key":"capt24323", "width":300, "height":20, "text":"RTU CAVBINET TEMP .", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"323.97958977085705 212.33830276999925"},
{"category":"static_text", "key":"capt242223", "width":324, "height":20, "text":"WALL-HOUR PULSE COUNT", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"335.97958977085705 237.33830276999925"},
{"category":"RectanStroke", "key":"rts22", "width":2, "height":50, "text":"", "textcolor":"white", "fill":"transparent", "stroke":"white", "strokeWidth":2, "Tag":"", "loc":"-688.3269136824979 62.51483095585604"},
{"category":"static_text", "key":"capt62424", "width":77, "height":20, "text":"42\"", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-613.3976639199177 165.79459306420972"},
{"category":"static_text", "key":"capt62432", "width":77, "height":20, "text":"HOV008", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-541.3976639199177 180.79459306420972"},
{"category":"static_text", "key":"capt6242322", "width":77, "height":20, "text":"24\"", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"3.6023360800822957 -280.2054069357903"},
{"category":"static_text", "key":"capt624433", "width":77, "height":20, "text":"HV124", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"-232.3976639199177 -144.20540693579028"},
{"category":"Rectan", "key":-98, "width":150, "height":50, "text":"KCE", "fill":"grey", "stroke":"#0000ff", "Tag":"", "loc":"-136.7113479062516 260.37110542187474", "font":"16px sans-serif"},
{"category":"Rectan", "key":-99, "width":150, "height":50, "text":"NGVSTX", "fill":"grey", "stroke":"#0000ff", "Tag":"", "loc":"-824.7113479062516 310.37110542187474", "font":"16px sans-serif"},
{"category":"RectanStroke", "key":-100, "width":117, "height":50, "text":"", "textcolor":"white", "fill":"transparent", "stroke":"white", "strokeWidth":2, "Tag":"", "loc":"-491.71521159995336 69.27909634615594", "zOrder":-11},
{"category":"text_nomodel", "key":-101, "width":120, "height":20, "text":"D4900-PAL-008", "stroke":"white", "font":"18px sans-serif", "Tag":"D4900-PAL-008", "textAlign":"left", "format":"", "loc":"-487.09000000000015 82.279096346156", "DataSource":"3", "datafield":"CUR_VALUE", "zOrder":5},
{"category":"static_text", "key":-102, "width":324, "height":20, "text":"FGS ACKNOWLEDGE SWITCH", "stroke":"white", "font":"18px sans-serif", "Tag":"", "textAlign":"left", "loc":"386.97958977085705 -161.66169723000075"},
{"Tag":"SD4900-ACK-008", "category":"static", "key":-103, "source":"../img/symbol/original/62.png", "image":"62.png", "width":18, "height":18, "loc":"188.6406681955881 -162.45810248089737", "DataSource":"3", "datafield":"STATUS_STATE"},
{"category":"RectanStroke", "key":-104, "width":415, "height":212, "text":"", "textcolor":"white", "fill":"transparent", "stroke":"#00ff00", "strokeWidth":1, "Tag":"", "loc":"368.5695897708458 150.62650571784116", "borderColor":"#00ff00", "zOrder":-5},
{"category":"text_nomodel", "key":-94, "width":156, "height":20, "text":"A4900-XT-085", "stroke":"white", "font":"18px sans-serif", "Tag":"A4900-XT-085", "textAlign":"right", "format":"#,##0.000 U", "loc":"492.90999999999985 88.279096346156", "DataSource":"1", "datafield":"CUR_VALUE"},
{"category":"text_nomodel", "key":-95, "width":156, "height":20, "text":"SA4900-XI-083S", "stroke":"white", "font":"18px sans-serif", "Tag":"SA4900-XI-083S", "textAlign":"right", "format":"#,##0.00 U", "loc":"492.90999999999985 238.279096346156", "DataSource":"1", "datafield":"CUR_VALUE", "zOrder":20},
{"category":"text_nomodel", "key":-96, "width":156, "height":20, "text":"A4900-TI-108", "stroke":"white", "font":"18px sans-serif", "Tag":"A4900-TI-108", "textAlign":"right", "format":"#,##0.000 U", "loc":"492.90999999999985 213.279096346156", "DataSource":"1", "datafield":"CUR_VALUE"},
{"category":"text_nomodel", "key":-97, "width":156, "height":20, "text":"A4900-TI-008", "stroke":"white", "font":"18px sans-serif", "Tag":"A4900-TI-008", "textAlign":"right", "format":"#,##0.000 U", "loc":"492.90999999999985 188.279096346156", "DataSource":"1", "datafield":"CUR_VALUE"},
{"category":"text_nomodel", "key":-105, "width":156, "height":20, "text":"A4900-XT-084", "stroke":"white", "font":"18px sans-serif", "Tag":"A4900-XT-084", "textAlign":"right", "format":"#,##0.00 U", "loc":"492.90999999999985 163.279096346156", "DataSource":"1", "datafield":"CUR_VALUE"},
{"category":"text_nomodel", "key":-106, "width":156, "height":20, "text":"A4900-XT-082", "stroke":"white", "font":"18px sans-serif", "Tag":"A4900-XT-082", "textAlign":"right", "format":"#,##0.0000 U", "loc":"492.90999999999985 138.279096346156", "DataSource":"1", "datafield":"CUR_VALUE"},
{"category":"text_nomodel", "key":-107, "width":156, "height":20, "text":"A4900-XT-081", "stroke":"white", "font":"18px sans-serif", "Tag":"A4900-XT-081", "textAlign":"right", "format":"#,##0.0000 U", "loc":"492.90999999999985 113.279096346156", "DataSource":"1", "datafield":"CUR_VALUE"},
{"category":"text_nomodel", "key":-108, "width":156, "height":20, "text":"A4900-EI-008", "stroke":"white", "font":"18px sans-serif", "Tag":"A4900-EI-008", "textAlign":"right", "format":"#,##0.000 U", "loc":"492.90999999999985 63.279096346155995", "DataSource":"1", "datafield":"CUR_VALUE"},
{"category":"RectanStroke", "key":-109, "width":415, "height":346, "text":"", "textcolor":"white", "fill":"transparent", "stroke":"#00ff00", "strokeWidth":1, "Tag":"", "loc":"368.5695897708458 -189.37349428215884", "borderColor":"#00ff00", "zOrder":-12}
],
"linkDataArray": [ 
{"from":"rectan", "to":"s1102", "fromPort":"", "toPort":"", "points":[-749.7113479062516,150.37110542187474,-739.7113479062516,150.37110542187474,-739.7113479062516,150.41679200123104,-739.7113479062516,150.41679200123104,-582.0900000000001,150.41679200123104,-572.0900000000001,150.41679200123104]},
{"from":"s1102", "to":"rectan2", "fromPort":"", "toPort":"", "points":[-522.0900000000001,150.25881693344988,-512.0900000000001,150.25881693344988,-512.0900000000001,150.37110542187474,-512.0900000000001,150.37110542187474,-221.7113479062516,150.37110542187474,-211.7113479062516,150.37110542187474]},
{"from":"rectan", "to":"s127232", "fromPort":"", "toPort":"", "points":[-749.7113479062516,150.10059619545757,-739.7113479062516,150.10059619545757,-739.7113479062516,150.10059619545757,-739.7113479062516,150.41394327811392,-688.217132730068,150.41394327811392,-688.217132730068,20.288652263985853,-688.217132730068,10.288652263985853]},
{"from":"s127232", "to":"s152", "fromPort":"", "toPort":"", "points":[-688.217132730068,-39.71134773601415,-688.1548228733882,-49.71134773601415,-688.1548228733882,-100.2994050194385,-588.8199437499995,-100.2994050194385,-578.8199437499995,-100.2994050194385]},
{"from":"s152", "to":"s1272322", "fromPort":"", "toPort":"", "points":[-528.8199437499995,-100.25033902006285,-518.8199437499995,-100.04539996370083,-403.217132730068,-100.04539996370083,-403.217132730068,-49.71134773601415,-403.217132730068,-39.71134773601415], "Thikness":"3", "scale":1},
{"from":"s1272322", "to":"s1102", "fromPort":"", "toPort":"", "points":[-403.217132730068,10.288652263985853,-403.217132730068,20.288652263985853,-403.217132730068,20,-403.217132730068,20,-403.217132730068,150.4709086650786,-512.0900000000001,150.4709086650786,-522.0900000000001,150.4709086650786], "Thikness":"3", "scale":1},
{"from":"s152", "to":"s174", "fromPort":"", "toPort":"", "points":[-528.8199437499995,-100.28940565057202,-518.8199437499995,-100.28940565057202,-516,-100.28940565057202,-516,-99.97527264874236,-366.5357952704891,-99.97527264874236,-356.5357952704891,-99.97527264874236], "Thikness":"3", "scale":1},
{"from":"s174", "to":"s127522", "fromPort":"", "toPort":"", "points":[-336.5357952704891,-99.97527264874236,-326.5357952704891,-99.97527264874236,-326.5357952704891,-100.07820061738664,-326.5357952704891,-100.07820061738664,-279.5611249999964,-100.07820061738664,-269.5611249999964,-100.07820061738664], "Thikness":"3", "scale":1},
{"from":"s1275222", "to":"s127522", "fromPort":"", "toPort":"", "points":[-269.5611249999964,-175.02600912504943,-279.5611249999964,-175.02600912504943,-307.66488397796087,-175.02600912504943,-307.66488397796087,-100.16201222838052,-301.51158629840165,-100.16201222838052,-301.51158629840165,-100.16201222838052,-301.51158629840165,-100.12661700732062,-279.5611249999964,-100.12661700732062,-269.5611249999964,-100.12661700732062], "Thikness":"3", "scale":1},
{"from":"s1275222", "to":"s175", "fromPort":"", "toPort":"", "points":[-219.56112499999642,-175.21861367705773,-209.56112499999642,-175.21861367705773,-205.95984186128044,-175.21861367705773,-205.95984186128044,-175.1926207170282,-202.35855872256445,-175.1926207170282,-192.35855872256445,-175.1926207170282]},
{"from":"s127522", "to":"s1752", "fromPort":"", "toPort":"", "points":[-219.56112499999642,-99.6163875544149,-209.56112499999642,-99.6163875544149,-205.95984186128044,-99.6163875544149,-205.95984186128044,-99.66187706041723,-202.35855872256445,-99.66187706041723,-192.35855872256445,-99.66187706041723]},
{"from":"s1742", "to":"s1752", "fromPort":"", "toPort":"", "points":[-147.53579527048907,-99.76921781061988,-157.53579527048907,-99.76921781061988,-158.94717699652676,-99.76921781061988,-158.94717699652676,-99.8604424848812,-160.35855872256445,-99.8604424848812,-170.35855872256445,-99.8604424848812]},
{"from":"s17422", "to":"s175", "fromPort":"", "toPort":"", "points":[-147.53579527048907,-175.22093511805696,-157.53579527048907,-175.22093511805696,-158.94717699652676,-175.22093511805696,-158.94717699652676,-175.30249227437122,-160.35855872256445,-175.30249227437122,-170.35855872256445,-175.30249227437122]},
{"from":"s1742", "to":"capt623", "fromPort":"", "toPort":"", "points":[-127.53579527048907,-100.32008049947407,-117.53579527048907,-100.32008049947407,-116,-100.32008049947407,-116,-100.32008049947407,-50.397663919917704,-100.32008049947407,-50.397663919917704,-330.2054069357903,-50.397663919917704,-340.2054069357903], "fromArrow":"", "toArrow":"Standard", "arrowStyle":"arrow2"},
{"from":"s17422", "to":"s1742", "fromPort":"", "toPort":"", "points":[-127.53579527048907,-174.4399168983533,-117.53579527048907,-174.4399168983533,-79.32722586947654,-174.4399168983533,-79.32722586947654,-100.1039765709885,-79.5370920360578,-100.1039765709885,-79.5370920360578,-99.90463445445974,-116,-99.90463445445974,-116,-100.19932467200276,-117.53579527048907,-100.19932467200276,-127.53579527048907,-100.19932467200276]},
{"from":"rts2732", "to":"rts22", "fromPort":"", "toPort":"", "points":[-751.0900000000001,69.75572631651373,-741.0900000000001,69.75572631651373,-720.208456841249,69.75572631651373,-720.208456841249,69.55374697148105,-698.8573504185235,69.55374697148105,-688.8573504185235,69.55374697148105], "LineStyle":"Dotted Line", "Thikness":"1", "scale":1, "Color":"#f9f9f9"},
{"from":-98, "to":"rectan2", "fromPort":"", "toPort":"", "points":[-211.7113479062516,266.62755408334834,-221.7113479062516,266.62755408334834,-221.7113479062516,266.5818157927936,-308.8935121661671,266.5818157927936,-308.8935121661671,150.0906002006948,-221.7113479062516,150.0906002006948,-221.7113479062516,150.75138859884476,-211.7113479062516,150.75138859884476]},
{"from":-99, "to":"s1102", "fromPort":"", "toPort":"", "points":[-749.7113479062516,308.9894641794092,-739.7113479062516,308.9894641794092,-739.7113479062516,308.43569727647264,-716.3667807711623,308.43569727647264,-716.3667807711623,150.6122850425462,-582.0900000000001,150.6122850425462,-572.0900000000001,150.6122850425462]}
]}