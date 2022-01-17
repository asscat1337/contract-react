import {useEffect} from 'react'
import styles from './Modal.module.scss'

function Modal({onClose,title='',footer = '',children}){
  const closeModal =()=>{
          onClose(false)
  }

  const onKeyDown = ({key})=>{
          if(key==='Escape'){
            onClose(false)
          }
  }

  useEffect(()=>{
      document.addEventListener('keydown',onKeyDown)
          return ()=>document.removeEventListener('keydown',onKeyDown)
  },[]);
 return (
   <>
   <div className={styles.modal} onClick={closeModal}>
      <div className={styles.modalDialog} onClick={e=>e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
            <span className={styles.modalClose} onClick={closeModal}>
                  &times;
                </span>
        </div>
         <div className={styles.modalBody}>
                <div className={styles.content}>
                    {children}
                </div>
        </div>
      {footer && <div className={styles.modalFooter}> {footer}</div>}
</div>
 </div>
</>
)
}

export default Modal