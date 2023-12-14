"use client"
import Image from 'next/image'
import { ButtonAddLink, ButtonCancel } from "@/components/Buttons";
import { useState, useEffect } from "react";
import {environment} from "@/environment/environment";

export default function Home() {





  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });


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
      
      alert('Dados salvos com sucesso!');
      resetForm();
  
    } catch (error) {
      console.log(error);
      alert('Ocorreu um erro ao enviar os dados.');
    }
  }
  





















  return (
    <div className="flex items-center justify-center h-screen bg-gray-500 max-[600px]:p-6" >
      <form className="w-md max-[600px]:h-[400px]  bg-white rounded-[10px] shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Contate-nos</h2>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Nome
            </label>
            <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded-[7px] max-[600px]:py-1 max-[600px]:px-2 max-[600px]:text-sm py-3 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"value={formData.name} onChange={handleChange} name="name" id="name" type="text" placeholder="Seu nome" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded-[7px] py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 max-[600px]:py-1 max-[600px]:px-2 max-[600px]:text-sm"value={formData.email} onChange={handleChange} name="email" id="email" type="email" placeholder="Seu email" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Mensagem
            </label>
            <textarea className="no-resize appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-[7px] py-3 px-4 mb-0 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none max-[600px]:h-12"name="message" value={formData.message} onChange={handleChange} id="message" defaultValue={""} />
          </div>
        </div>
        
        <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end gap-3 mt-5 ">
               <ButtonCancel route="" label="Cancelar"  />
                <ButtonAddLink route="" label="Enviar" onClick={handleSubmit} />
              </div>
            </div>
      </form>
    </div>





  )
}
