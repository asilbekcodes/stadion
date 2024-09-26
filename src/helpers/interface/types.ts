interface Y {
    beginAtZero: boolean;
}

interface Scales {
    y: Y;
}

interface Padding {
    top: number;
    bottom: number;
}

interface Font {
    size: number;
    weight: string;
}
interface Title {
    display: boolean;
    text: string;
    align: string;
    font: Font;
    padding: Padding
}
interface Legend {
    display: boolean;
}

interface Plugin {
    legend: Legend;
    title: Title;
}

interface Tension {
    from: number;
    to: number;
    loop: boolean;
    duration: number;
    easing: string;
}

interface Animation {
    tension: Tension;
}

export default interface Options {
    animations: Animation;
    responsive: boolean;
    maintainAspectRatio: boolean;
    plugins: Plugin;
    scales: Scales;
};

export interface GlobalTypes {
    loading: boolean;
    error: Error | null;
    response: Response | undefined;
    globalDataFunc: () => void;
    options: Options;
    data: any;
}

export interface TableTypes {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface ClientTypes {
    firstName: string;
    lastName: string;
    order: number;
    phoneNumber: string;
}

export interface T{
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    order: number;
}