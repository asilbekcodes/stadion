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

export default interface Options {
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