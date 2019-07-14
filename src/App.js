import React from 'react';
import {Button,message} from
class App extends Comment {
  handleClick =()=>{
    message.info('点击了')
  }
  render(){
    return (
      <div className="App">
        <Button type="primay" onClick={this.handleClick}>按钮</Button>
      </div>
    )
  }
}
export default App;
