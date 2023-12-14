"use client"
import Image from 'next/image'
import { ButtonAddLink, ButtonCancel, ButtonConfirm, ButtonTerm } from "@/components/Buttons";
import { useState, useEffect } from "react";
import {environment} from "@/environment/environment";

export default function Home() {

  interface User {
    id: number;
    usuario: string;
    email: string;
    mensagem: string;
    created_at: string;
  }


  const [ showList, setShowList] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [userData, setUserData] = useState<User[]>([]);

  const handleChange = (event:any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };


  const resetForm = () => {
    setFormData({
      name: "",
      email:"",
      message:""
    });
  }


  const handleList = async (event: any) => {
    if (showList === false) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  
    try {
      const response = await fetch(`${environment.apiUrl}/user/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
      });
  
      if (!response.ok) {
        throw new Error('Ocorreu um erro.');
      }
  
      const data = await response.json();
      setUserData(data);
      console.log('dados do banco', data);
    } catch (error) {
      console.log(error);
      alert('Ocorreu um erro.');
    }
  };
  
  
  


  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.message === ""
     
    ) {
      alert("Por favor, preencha todos os campos !");
      return;
    }
    try {
      const response = await fetch(`${environment.apiUrl}/user/save`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Ocorreu um erro ao enviar os dados.');
      }
      resetForm();
      alert('Dados salvos com sucesso!');
      
  
    } catch (error) {
      console.log(error);
      alert('Ocorreu um erro ao enviar os dados.');
    }
  }
  





















  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500 max-[600px]:p-6" >
      <form className="w-md max-[600px]:h-[400px]  bg-white rounded-[10px] shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Contate-nos</h2>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Nome
            </label>
            <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded-[7px] max-[600px]:py-1 max-[600px]:px-2 max-[600px]:text-sm py-3 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"value={formData.name}  onChange={handleChange} name="name" id="name" type="text" placeholder="Seu nome" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded-[7px] py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 max-[600px]:py-1 max-[600px]:px-2 max-[600px]:text-sm" onChange={handleChange} value={formData.email}  name="email" id="email" type="email" placeholder="Seu email" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Mensagem
            </label>
            <textarea className="no-resize appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-[7px] py-3 px-4 mb-0 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none max-[600px]:h-12"name="message" value={formData.message}   onChange={handleChange} id="message" defaultValue={""} />
          </div>
        </div>
        
        <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end gap-3 mt-5 ">
              <ButtonTerm route="" label="Listar"  onClick={handleList} />
               <ButtonCancel route="" label="Cancelar"  />
                <ButtonAddLink route="" label="Enviar" onClick={handleSubmit}  />
              </div>
            </div>
      </form>





      <div className={`w-1/2 max-[600px]:w-full  transition-all duration-500 ${showList ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full">
          <div className="grid gap-4">
            <div className="overflow-auto mt-4 w-full bg-white rounded-[10px] drop-shadow-md p-8">
              <table className="table-auto w-full text-left text-sm font-light">
                <thead className="border-b border-gray-300 font-medium">
                  <tr>
                    <th scope="col" className="px-1 py-1 ">Cód.</th>
                    <th scope="col" className="px-1 py-1 ">Nome</th>
                    <th scope="col" className="px-1 py-1 text-center ">Email</th>
                    <th scope="col" className="px-1 py-1 text-center ">Mensagem</th>
                    <th scope="col" className="px-1 py-1 text-center ">Data criação</th>
                  </tr>
                </thead>
                <tbody>
                {userData.map(user => (
                  <tr className="border-b border-gray-100 transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="whitespace-nowrap px-3 py-1 ">{user.id}</td>
                    <td className="whitespace-nowrap px-3 py-1 uppercase">{user.usuario}</td>
                    <td className="whitespace-nowrap px-3 py-1  lowercase">{user.email}</td>
                    <td className="whitespace-nowrap px-3 py-1  lowercase">{user.mensagem}</td>
                    <td className="whitespace-nowrap px-3 py-1  ">{user.created_at}</td>
                  </tr>
                   ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>

      





    </div>
    








  )
}
