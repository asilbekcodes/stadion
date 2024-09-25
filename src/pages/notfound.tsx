import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronsLeft, ChevronsLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"


const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center" >
      <div className="text-6xl font-mono font-bold">
        <h1>404</h1>
        <h2>Not Found</h2>
        <Button onClick={goBack} variant="outline" className="flex space-x-1 items-center mt-7" size="sm">
          <ChevronsLeft className="h-4 w-4" />
          <h1 className="text-xl">Go Back</h1>
        </Button>
      </div>
    </div >
  )

}

export default NotFound