import React, { useEffect, useMemo, useState } from "react";

function Type() {
    const strings = useMemo(
        () => [
            "Graphic Designer",
            "Logo & Visual Identity Designer",
            "Educational Content Designer",
            "Web Designer",
        ], []
    );

    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = strings[index] || "";

        const isAtEnd = subIndex === current.length;
        const isAtStart = subIndex === 0;

        let timeout = 80;
        if (deleting) timeout = 45;
        if (isAtEnd && !deleting) timeout = 900;
        if (isAtStart && deleting) timeout = 300;

        const t = setTimeout(() => {
            if (!deleting) {
                if (isAtEnd) {
                    setDeleting(true);
                    return;
                }
                setSubIndex((v) => v + 1);
            } else {
                if (isAtStart) {
                    setDeleting(false);
                    setIndex((v) => (v + 1) % strings.length);
                    return;
                }
                setSubIndex((v) => v - 1);
            }
        }, timeout);

        return () => clearTimeout(t);
    }, [deleting, index, strings, subIndex]);

    const text = (strings[index] || "").slice(0, subIndex);

    return React.createElement(
        "span", { "aria-label": "Typewriter", style: { whiteSpace: "pre" } },
        text,
        React.createElement(
            "span", { className: "typewriter-caret", "aria-hidden": "true" },
            "|"
        )
    );
}

export default Type;