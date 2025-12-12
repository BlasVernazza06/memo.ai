const universities = [
  "Universidad Complutense",
  "UNAM",
  "UBA",
  "Tecnológico de Monterrey",
  "Universidad de Chile",
  "Universidad de Salamanca"
];


export default function TrustSection() {
    return (
        <section className="my-20">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm text-muted-foreground mb-8">
                Utilizado por más de <span className="font-semibold text-foreground">10,000+ estudiantes</span> de universidades como
                </p>
                
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {universities.map((uni) => (
                        <div 
                        key={uni} 
                        className="text-muted-foreground/60 font-medium text-sm md:text-base hover:text-muted-foreground transition-colors"
                        >
                        {uni}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}