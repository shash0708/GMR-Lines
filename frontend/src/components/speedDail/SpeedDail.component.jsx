
import React, { useRef } from 'react';
import { SpeedDial } from 'primereact/speeddial';
// import { useRouter } from 'next/router';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 

export default function MaskDemo() {
    const toast = useRef(null);
    // const router = useRouter();
    const items = [
        {
            label: 'Add',
            icon: 'pi pi-pencil',
            command: () => {
                toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
            }
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                toast.current.show({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
            }
        },
    ]
    //     {
    //         label: 'Delete',
    //         icon: 'pi pi-trash',
    //         command: () => {
    //             toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
    //         }
    //     },
    //     {
    //         label: 'Upload',
    //         icon: 'pi pi-upload',
    //         command: () => {
    //             router.push('/fileupload');
    //         }
    //     },
    //     {
    //         label: 'React Website',
    //         icon: 'pi pi-external-link',
    //         command: () => {
    //             window.location.href = 'https://react.dev/';
    //         }
    //     }
    // ];

    return (
        <div className="card">
        <div style={{ position: 'absolute', border: '2px solid', height: '3px', right: 10, bottom: 0,}}>
            <Toast ref={toast} />
            <SpeedDial mask model={items} radius={120} direction="up" style={{ right: 0, bottom: 0 }} />
        </div>
    </div>
    )    
}
        