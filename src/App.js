import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([])
  const [toDo, setToDo] = useState('')
  const [checkedToDo, setCheckedToDo] = useState([])
  const [deltToDo, setDeltToDo] = useState([])
  const options = {
    weekday: "long",
    year: "numeric",
    month:"long",
    day:"numeric"
};
  return (
    <div className="app">
      <div className={'main'}>
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>{new Date().toLocaleDateString("en-US",options)}</h2>
       
      </div>
      <div className="input">
        <input value={toDo} onChange={
          (e) => setToDo(e.target.value)} type="text" placeholder="🖊 Add item..." />

        <i onClick={() => {
          setToDos([...toDos, { id: Date.now(), tempText: toDo, text: toDo, status: false }])
          setToDo('')
        }} className="fas fa-plus"></i>
      </div>
      {
        toDos.map((obj) => {
          return (<div className="todos" key={obj.id} >
            <div className="todo">
              <div className="left">
                <input onChange={(e) => {
                  console.log('value', e.target.checked);
                  console.log('obj', obj);

                  setToDos(
                    toDos.filter(obj2 => {
                      if (obj2.id === obj.id) {
                        obj2.status = e.target.checked
                        obj2.text = (<del>{obj2.text}</del>)
                        setCheckedToDo([...checkedToDo, obj2])
                        console.log(checkedToDo);
                        obj2 = !e.target.checked
                      }
                      return obj2
                    })
                  )
                }

                } value={obj.status} type="checkbox" name="" id="" />
                <p>{obj.text}</p>
              </div>
              <div className="right">
                <i onClick={() => {
                  setToDos(
                    toDos.filter((obj3) => {
                      if (obj3.id === obj.id) {
                        console.log('match');

                        setDeltToDo([...deltToDo, obj3])
                        console.log(deltToDo);
                        obj3 = false
                      }
                      return obj3
                    })
                  )
                }

                } className="fas fa-times"></i>
              </div>
            </div>
          </div>)
        })

      }
</div>
      <div className={'checked-contents'} style={{ marginTop: 20 }}>
        <h3>Finished Todo</h3>
        {
          checkedToDo.map((obj) => {
            if (obj.status) {
              return (
                <div className="todos" key={obj.id} >
                  <div className="todo">
                    <div className="left">
                      <input onChange={
                        (e) => {
                          setCheckedToDo(
                            checkedToDo.filter(obj2 => {
                              if (obj2.id === obj.id) {
                                obj2.status = false
                                obj2.text = obj.tempText
                                setToDos([...toDos, obj2])
                                obj2 = false
                              }
                              return obj2
                            })
                          )
                        }
                      } checked={checkedToDo.status = true} type="checkbox" name="" id="" />
                      <p>{obj.text}</p>
                    </div>
                    <div className="right">
                      <i onClick={() => {
                        setCheckedToDo(
                          checkedToDo.filter((obj3) => {
                            if (obj3.id === obj.id) {
                              console.log('match');
                              obj3 = false
                            }
                            return obj3
                          })
                        )
                      }

                      } className="fas fa-times"></i>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          })

        }
      </div>


      <div className={'deleted-contents'} >
      <h3>Deleted ToDo</h3>
        {
         
          deltToDo.map((obj) => {
            
              return (
                <div className="todos" key={obj.id} >
                  <div className="todo">
                    <div className="left">
                      <input checked={false} type="checkbox" name="" id="" />
                       <p>{obj.text}</p>
                    </div>
                    <div className="right">
                      <i onClick={() => {
                        setDeltToDo(
                          deltToDo.filter((obj3) => {
                            if (obj3.id === obj.id) {
                              console.log('match');
                              obj3 = false
                            }
                            return obj3
                          })
                        )
                      }

                      } className="fas fa-times"></i>
                    </div>
                  </div>
                </div>
              )
            
            return null
          })

        }
      </div>
    </div >

  );
}

export default App;