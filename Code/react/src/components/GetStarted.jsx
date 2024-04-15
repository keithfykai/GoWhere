import styles from "../style";

const GetStarted = () => (
  <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-gradient-to-r from-yellow-400 to-red-400 p-[2px] cursor-pointer`}>
    <div className={`${styles.flexCenter} flex-col bg-white w-[100%] h-[100%] rounded-full hover:bg-gradient-to-r from-yellow-400 to-red-400 duration-300`}>
      <div className={`${styles.flexStart} flex-row`}>
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-black">Get</span>
        </p>
      </div>
      
      <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
        <span className="text-black">Started!</span>
      </p>
    </div>
  </div>
);

export default GetStarted;